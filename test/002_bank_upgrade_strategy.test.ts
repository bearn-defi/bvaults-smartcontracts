import {expect} from './chai-setup';
// @ts-ignore
import {ethers} from 'hardhat';
import {Contract, ContractFactory, BigNumber, utils} from 'ethers';
// @ts-ignore
import {SignerWithAddress} from 'hardhat-deploy-ethers/dist/src/signer-with-address';

import {toWei, mineBlocks, getLatestBlockNumber, MAX_UINT256} from './shared/utilities';

describe('002_bank_upgrade_strategy.test', () => {
    const {provider} = ethers;

    let signers: SignerWithAddress[];
    let deployer: SignerWithAddress;
    let operator: SignerWithAddress;
    let alice: SignerWithAddress;
    let bob: SignerWithAddress;
    let carol: SignerWithAddress;
    let david: SignerWithAddress;

    before('setup accounts', async () => {
        signers = await ethers.getSigners();
        deployer = signers[0];
        alice = signers[1];
        bob = signers[2];
        carol = signers[3];
        david = signers[4];
        operator = deployer;
    });

    let MockERC20: ContractFactory;
    let BvaultsBank: ContractFactory;
    let MockStrategy: ContractFactory;

    before('fetch contract factories', async () => {
        MockERC20 = await ethers.getContractFactory('MockERC20');
        BvaultsBank = await ethers.getContractFactory('BvaultsBank');
        MockStrategy = await ethers.getContractFactory('MockStrategy');
    });

    let bfi: Contract;
    let bdo: Contract;
    let want: Contract;
    let bank: Contract;
    let oldStrategy: Contract;
    let newStrategy: Contract;

    let startBlock: BigNumber;

    before('deploy contracts', async () => {
        bfi = await MockERC20.connect(deployer).deploy('Bearn.Fi', 'BFI', 18);
        bdo = await MockERC20.connect(deployer).deploy('bDollar', 'BDO', 18);
        want = await MockERC20.connect(deployer).deploy('Fake Cake-LP', 'FCKLP', 18);

        bank = await BvaultsBank.connect(deployer).deploy();
        startBlock = BigNumber.from(await getLatestBlockNumber(ethers)).add(10);
        await bank.initialize(startBlock, bfi.address, toWei('0.01'), bdo.address, toWei('1'));

        oldStrategy = await MockStrategy.connect(deployer).deploy(want.address);
        newStrategy = await MockStrategy.connect(deployer).deploy(want.address);

        await bank.add(1000, want.address, true, oldStrategy.address);

        await bfi.mint(bank.address, toWei('1000'));
        await bdo.mint(bank.address, toWei('1000'));

        await want.mint(bob.address, toWei('1000'));
        await want.mint(operator.address, toWei('1000'));
        await want.connect(bob).approve(bank.address, MAX_UINT256);
        await want.connect(operator).approve(oldStrategy.address, MAX_UINT256);
        await want.connect(operator).approve(newStrategy.address, MAX_UINT256);
    });

    describe('#upgradeStrategy', () => {
        it("parameters should be correct", async () => {
            expect(await bank.operator()).is.eq(deployer.address);
            expect(await bank.startBlock()).is.eq(14);
            expect(await bank.rewardPoolLength()).is.eq(2);
            expect(await bank.totalAllocPoint()).is.eq(1000);
            expect(await bank.poolLength()).is.eq(1);
            expect(String(await oldStrategy.getPricePerFullShare())).is.eq(toWei(1));
        });

        it('bob deposit 10 LP should work', async () => {
            await expect(async () => {
                await bank.connect(bob).deposit(0, toWei('10'));
            }).to.changeTokenBalances(want, [bob], [toWei('-10')]);
        });

        it('strategy earn should work', async () => {
            await oldStrategy.earn();
            expect(String(await oldStrategy.wantLockedTotal())).is.eq(toWei('10.1'));
            expect(String(await oldStrategy.sharesTotal())).is.eq(toWei('10'));
            expect(String(await oldStrategy.getPricePerFullShare())).is.eq(toWei('1.01'));
        });

        it('bob withdraw 5 LP should work', async () => {
            await expect(bank.connect(bob).withdraw(0, toWei('5'))).to.revertedWith('BvaultsBank: frozen');
            await bank.setUnstakingFrozenTime(0);
            let _beforeBfi = await bfi.balanceOf(bob.address);
            await expect(async () => {
                await bank.connect(bob).withdraw(0, toWei('5.05'));
            }).to.changeTokenBalances(want, [bob], [toWei('5.05')]);
            expect(String(await oldStrategy.wantLockedTotal())).is.eq(toWei('5.05'));
            expect(String(await oldStrategy.sharesTotal())).is.eq(toWei('5.0'));
            let _afterBfi = await bfi.balanceOf(bob.address);
            expect(_afterBfi.sub(_beforeBfi)).is.eq(toWei('0.04'));
        });

        it('upgrade to new strategy should work', async () => {
            await oldStrategy.earn();
            await bank.connect(bob).deposit(0, toWei('5'));
            expect(String(await oldStrategy.wantLockedTotal())).is.eq(toWei('10.1005'));
            expect(String(await oldStrategy.sharesTotal())).is.eq(toWei('9.90148024703460445'));
            expect(String(await oldStrategy.getPricePerFullShare())).is.eq(toWei('1.0201'));

            await bank.migrateStrategy(0, newStrategy.address);
            expect(String(await want.balanceOf(newStrategy.address))).is.eq(toWei('10.1005'));
            expect(String(await newStrategy.wantLockedTotal())).is.eq(toWei('10.1005'));
            expect(String(await newStrategy.sharesTotal())).is.eq(toWei('9.90148024703460445'));
            expect(String(await newStrategy.getPricePerFullShare())).is.eq(toWei('1.0201'));

            await newStrategy.earn();
            await newStrategy.earn();
            expect(String(await newStrategy.wantLockedTotal())).is.eq(toWei('10.30352005'));
            expect(String(await newStrategy.sharesTotal())).is.eq(toWei('9.90148024703460445'));
            expect(String(await newStrategy.getPricePerFullShare())).is.eq(toWei('1.04060401'));
        });
    });
});
