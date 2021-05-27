// @ts-ignore
import chai, {expect} from 'chai';
import {ethers} from 'hardhat';
import {solidity} from 'ethereum-waffle';
import {Contract, ContractFactory, BigNumber, utils} from 'ethers';
import {Provider} from '@ethersproject/providers';
// @ts-ignore
import {SignerWithAddress} from '@nomiclabs/hardhat-ethers/dist/src/signer-with-address';

import {toWei, mineBlocks, getLatestBlockNumber, MAX_UINT256} from './shared/utilities';

chai.use(solidity);

describe('001_bank.test', () => {
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
    let strategy: Contract;

    let startBlock: BigNumber;

    beforeEach('deploy contracts', async () => {
        bfi = await MockERC20.connect(deployer).deploy('Bearn.Fi', 'BFI', 18);
        bdo = await MockERC20.connect(deployer).deploy('bDollar', 'BDO', 18);
        want = await MockERC20.connect(deployer).deploy('Fake Cake-LP', 'FCKLP', 18);

        bank = await BvaultsBank.connect(deployer).deploy();
        startBlock = BigNumber.from(await getLatestBlockNumber(ethers)).add(10);
        await bank.initialize(startBlock, bfi.address, toWei('0.01'), bdo.address, toWei('1'));

        strategy = await MockStrategy.connect(deployer).deploy(want.address);
        await bank.add(1000, want.address, true, strategy.address);

        await bfi.mint(bank.address, toWei('1000'));
        await bdo.mint(bank.address, toWei('1000'));

        await want.mint(bob.address, toWei('1000'));
        await want.connect(bob).approve(bank.address, MAX_UINT256);
    });

    describe('BvaultsBank should work', () => {
        it('constructor parameters should be correct', async () => {
            expect(await bank.operator()).is.eq(deployer.address);
            expect(await bank.startBlock()).is.eq(14);
            expect(await bank.rewardPoolLength()).is.eq(2);
        });

        it('parameters should be correct', async () => {
            expect(await bank.totalAllocPoint()).is.eq(1000);
            expect(await bank.poolLength()).is.eq(1);
        });

        it('add', async () => {
            let want2 = await MockERC20.connect(deployer).deploy('Fake Cake-LP 2', 'FCKLP 2', 18);
            await bank.add(1000, want2.address, true, strategy.address);
            expect(await bank.poolLength()).is.eq(2);
            let poolInfo = await bank.poolInfo(1);
            expect(poolInfo.lastRewardBlock).is.eq(36);
        });

        it('bob deposit 10 LP', async () => {
            await expect(async () => {
                await bank.connect(bob).deposit(0, toWei('10'));
            }).to.changeTokenBalances(want, [bob], [toWei('-10')]);
            await mineBlocks(ethers, 50);
            expect(await bank.pendingReward(0, 0, bob.address)).is.eq(toWei('0.48'));
            expect(await bank.pendingReward(0, 1, bob.address)).is.eq(toWei('48'));
            await mineBlocks(ethers, 49);
            expect(await getLatestBlockNumber(ethers)).is.eq(146);
            await expect(async () => {
                await bank.connect(bob).withdraw(0, 0);
            }).to.changeTokenBalances(bfi, [bob], [toWei('0.98')]);
            await mineBlocks(ethers, 10);
            expect(await bank.pendingReward(0, 0, bob.address)).is.eq(toWei('0.1'));
            expect(await bank.pendingReward(0, 1, bob.address)).is.eq(toWei('10'));
            expect(await bfi.balanceOf(carol.address)).is.eq(toWei('0'));
        });

        it('bob withdraw 5 LP', async () => {
            await bank.connect(bob).deposit(0, toWei('10'));
            await expect(bank.connect(bob).withdraw(0, toWei('5'))).to.revertedWith('BvaultsBank: frozen');
            await bank.setUnstakingFrozenTime(0);
            let _beforeBfi = await bfi.balanceOf(bob.address);
            await expect(async () => {
                await bank.connect(bob).withdraw(0, toWei('5'));
            }).to.changeTokenBalances(want, [bob], [toWei('5')]);
            let _afterBfi = await bfi.balanceOf(bob.address);
            expect(_afterBfi.sub(_beforeBfi)).is.eq(toWei('0.01'));
        });

        it('bob emergencyWithdraw', async () => {
            await bank.connect(bob).deposit(0, toWei('10'));
            await mineBlocks(ethers, 10);
            let _beforeBfi = await bfi.balanceOf(bob.address);
            await expect(async () => {
                await bank.connect(bob).emergencyWithdraw(0);
            }).to.changeTokenBalances(want, [bob], [toWei('10')]);
            let _afterBfi = await bfi.balanceOf(bob.address);
            expect(_afterBfi.sub(_beforeBfi)).is.eq(toWei('0'));
        });
    });
});
