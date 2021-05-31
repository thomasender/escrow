// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Escrow {
    
    address payable public  seller;
    address public buyer;
    uint256 public price;
    
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

    
    constructor (address _buyer, address payable _seller, uint256 _price) {
        buyer = _buyer;
        seller = _seller;
        price = _price;
    }
    
    
    function contractInit() contractNotInitiated public {
        require(msg.sender == buyer || msg.sender == seller, "Only buyer or seller can initiate contract!");
        if(msg.sender == buyer) {
            buyerIsIn = true;
        }
        if(msg.sender == seller) {
            sellerIsIn = true;
        }
        if(buyerIsIn && sellerIsIn) {
            currentState = State.AWAITING_PAYMENT;
        }
    }
    
    
     function deposit() onlyBuyer payable public {
        require(currentState == State.AWAITING_PAYMENT, "Deposit not possible!");
        require(msg.value == price, "Deposit amount not correct!");
        currentState = State.AWAITING_CONFIRM;
    }
    
    function confirmDelivery() onlyBuyer payable public {
        require(currentState == State.AWAITING_CONFIRM, "Cannot confirm!");
        ( bool success, ) = seller.call{value: price}("");
        require(success, "Transfer failed!");
        currentState = State.COMPLETE;
    }
    
    function withdraw() onlyBuyer payable public {
        require(currentState == State.AWAITING_CONFIRM, "Withdraw not possible!");
        ( bool success, ) = payable(buyer).call{value: price}("");
        require(success, "Transfer failed");
    }
    
}