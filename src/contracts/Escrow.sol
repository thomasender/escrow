// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Escrow {
    
    address payable public  seller;
    address public buyer;
    uint256 public price;
    bool public buyerDidPay;
    
    enum State {
        NOT_INITIATED,
        AWAITING_PAYMENT,
        AWAITING_CONFIRM,
        COMPLETE
    }
    
    State public currentState;
    
    
    bool public buyerIsIn;
    bool public sellerIsIn;
    
    modifier onlyBuyer() {
        require(msg.sender == buyer, "Only buyer can call this function!");
        _;
    }
    
    modifier contractNotInitiated() {
        require(currentState == State.NOT_INITIATED, "Contract is already initiated!");
        _;
    }

    event sellerInitialized(address seller);
    event buyerInitialized(address buyer);
    event contractInitiated(address seller, address buyer, uint256 price, State currentState);
    event buyerDeposit(address buyer, uint256 amount, State currentState);
    event deliveryConfirmed(State currentState);
    event buyerWithdraw(State currentState);
    
    constructor (address _buyer, address payable _seller, uint256 _price) {
        buyer = _buyer;
        seller = _seller;
        price = _price * (10**18);
        buyerDidPay = false;
    }
    
    
    function contractInit() contractNotInitiated public {
        require(msg.sender == buyer || msg.sender == seller, "Only buyer or seller can initiate contract!");
        if(msg.sender == buyer) {
            buyerIsIn = true;
            emit buyerInitialized(buyer);
        }
        if(msg.sender == seller) {
            sellerIsIn = true;
            emit sellerInitialized(seller);
        }
        if(buyerIsIn && sellerIsIn) {
            currentState = State.AWAITING_PAYMENT;
            emit contractInitiated(seller, buyer, price, currentState);
        }
    }
    
    
     function deposit() onlyBuyer payable public {
        require(currentState == State.AWAITING_PAYMENT, "Deposit not possible!");
        require(msg.value == price, "Deposit amount not correct!");
        currentState = State.AWAITING_CONFIRM;
        buyerDidPay = true;
        emit buyerDeposit(buyer, msg.value, currentState);
    }
    
    function confirmDelivery() onlyBuyer payable public {
        require(currentState == State.AWAITING_CONFIRM, "Cannot confirm!");
        ( bool success, ) = seller.call{value: price}("");
        require(success, "Transfer failed!");
        currentState = State.COMPLETE;
        emit deliveryConfirmed(currentState);
    }
    
    function withdraw() onlyBuyer payable public {
        require(currentState == State.AWAITING_CONFIRM, "Withdraw not possible!");
        ( bool success, ) = payable(buyer).call{value: price}("");
        require(success, "Transfer failed");
        currentState = State.AWAITING_PAYMENT;
        buyerDidPay = false;
        emit buyerWithdraw(currentState);
    }
    
}