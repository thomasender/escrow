require('chai')
.use(require('chai-as-promised'))
.should()
const { assert } = require('chai');
const Web3 = require('web3');

let web3 = new Web3(new Web3.providers.HttpProvider("localhost:7545"));

const ESCROW = artifacts.require("./Escrow.sol");

contract("Escrow", async (accounts) => {

    let buyer = accounts[0];
    let seller = accounts[1];
    let price = web3.utils.toWei("1", 'ether');
    let escrow;

    describe('Deployment', () => {
        beforeEach(async () => {
            escrow = await ESCROW.new(buyer, seller, price);
        });

        it('should migrate correctly', async () => {
            let result = await escrow.buyer();
            result.toString().should.equal(buyer.toString());
            result = await escrow.seller();
            result.toString().should.equal(seller.toString());
            result = await escrow.price();
            result.toString().should.equal(price);
            result = await escrow.currentState();
            result.toString().should.equal("0");
        })
    })

    describe('Contract Initialization', () => {
        beforeEach(async () => {
            escrow = await ESCROW.new(buyer, seller, price);
        });

        describe('success', () => {
            it('should initialize buyer correctly', async () => {
                await escrow.contractInit({from: buyer});
                let result = await escrow.buyerIsIn();
                result.should.equal(true);
                result = await escrow.currentState();
                result.toString().should.equal("0");
            })
            it('should initialize seller correctly', async () => {
                await escrow.contractInit({from: seller});
                let result = await escrow.sellerIsIn();
                result.should.equal(true);
                result = await escrow.currentState();
                result.toString().should.equal("0");
            })
            it('should initialize buyer, seller and state correctly', async () => {
                await escrow.contractInit({from: buyer});
                let result = await escrow.buyerIsIn();
                result.should.equal(true);
                await escrow.contractInit({from: seller});
                result = await escrow.sellerIsIn();
                result.should.equal(true);
                result = await escrow.currentState();
                result.toString().should.equal("1");
            })
        })
        describe('failure', () => {
            it('should not allow to initialize again', async () => {
                await escrow.contractInit({from: buyer});
                await escrow.contractInit({from: seller});
                await escrow.contractInit({from: buyer}).should.be.rejectedWith("VM Exception while processing transaction: revert Contract is already initiated!");
            })
            it('should not allow to initialize by not owner/not seller', async () => {
                await escrow.contractInit({from: accounts[2]}).should.be.rejectedWith("VM Exception while processing transaction: revert Only buyer or seller can initiate contract!");
            })
        })
    })

    describe('Deposit', () => {
        beforeEach(async () => {
            escrow = await ESCROW.new(buyer, seller, price);
            await escrow.contractInit({from: buyer});
            await escrow.contractInit({from: seller});
        })

        describe('success', () => {
            it('should allow deposit by buyer', async () => {
                await escrow.deposit({from: buyer, value: price});
                let result = await escrow.currentState();
                result.toString().should.equal("2");
            })
        })
        describe('failure', () => {
            it('should not allow deposit by not buyer', async () => {
                await escrow.deposit({from: seller, value: price}).should.be.rejectedWith("Only buyer can call this function!");
            })
            it('should not allow deposit with wrong amount', async () => {
                await escrow.deposit({from: buyer, value: price*2}).should.be.rejectedWith("Deposit amount not correct!");
            })
            it('should not allow to deposit again', async () => {
                await escrow.deposit({from: buyer, value: price});
                await escrow.deposit({from: buyer, value: price}).should.be.rejectedWith("Deposit not possible!"); 
            })
        })
    })

    describe('Confirm Delivery', () => {
        beforeEach(async () => {
            escrow = await ESCROW.new(buyer, seller, price);
            await escrow.contractInit({from: buyer});
            await escrow.contractInit({from: seller});
        })

        describe('success', () => {
            it('should handle confirm delivery correctly', async () => {
                await escrow.deposit({from: buyer, value: price}); 
                await escrow.confirmDelivery({from: buyer});
                let result = await escrow.currentState();
                result.toString().should.equal("3");
            })
        })
        describe('failure', () => {
            it('should throw if called by not buyer', async () => {
                await escrow.deposit({from: buyer, value: price}); 
                await escrow.confirmDelivery({from: seller}).should.be.rejectedWith("Only buyer can call this function!");
            })
            it('should reject if state is wrong', async () => {
                await escrow.confirmDelivery({from: buyer}).should.be.rejectedWith("Cannot confirm!");
            })
        })
    })

    describe('Withdraw', () => {
        beforeEach(async () => {
            escrow = await ESCROW.new(buyer, seller, price);
            await escrow.contractInit({from: buyer});
            await escrow.contractInit({from: seller});
        })
        
        describe('success', () => {
            it('should allow to withdraw before confirmation', async () => {
                await escrow.deposit({from: buyer, value: price}); 
                await escrow.withdraw({from: buyer});
            })
        })
        describe('failure', () => {
            it('should throw if withdraw when wrong state', async () => {
                await escrow.withdraw({from: buyer}).should.be.rejectedWith("Withdraw not possible!");
            })
            it('should not allow withdraw by not buyer', async () => {
                await escrow.deposit({from: buyer, value: price}); 
                await escrow.withdraw({from: seller}).should.be.rejectedWith("Only buyer can call this function!");
            })
        })
    })
})