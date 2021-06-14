const web3 = new Web3(Web3.givenProvider);

const address = "0xFbE07bc6525905F0011CD85dAE35Df5b94785901";
var escrow;
var user;
var price;
var buyer;
var seller;
var currentState;
var buyerIsIn;
var sellerIsIn;
var buyerDidPay;
var accounts;

if(typeof window.ethereum !== "undefined"){
    console.log("MetaMask is installed");
} else {
    alert("Please install Metamask!");
    window.open("http://metamask.com");
}

$(document).ready( async () => {

    //preparing userdata
    accounts = await ethereum.request({ method: 'eth_accounts' });
    user = accounts[0];
    const ethScanLink = "https://etherscan.io/address/" + user;
    loadUserData(user, ethScanLink);

    //fetching contract
    escrow = new web3.eth.Contract(abi, address, {from: user});
    console.log(escrow);
    buyer = await escrow.methods.buyer().call();
    seller = await escrow.methods.seller().call();
    buyerDidPay = await escrow.methods.buyerDidPay().call();
    buyerIsIn = await escrow.methods.buyerIsIn().call();
    sellerIsIn = await escrow.methods.sellerIsIn().call();
    currentState = await escrow.methods.currentState().call();
    price = await escrow.methods.price().call();

    loadContractData(seller, buyer, price, currentState, buyerIsIn, sellerIsIn);

    renderUI(user, buyer, currentState, buyerIsIn, sellerIsIn, buyerDidPay);

    escrow.events.allEvents({fromBlock: 0})
    .on('data', async (event) => {
        accounts = await ethereum.request({ method: 'eth_accounts' });
        user = accounts[0];
        buyer = await escrow.methods.buyer().call();
        seller = await escrow.methods.seller().call();
        buyerDidPay = await escrow.methods.buyerDidPay().call();
        buyerIsIn = await escrow.methods.buyerIsIn().call();
        sellerIsIn = await escrow.methods.sellerIsIn().call();
        currentState = await escrow.methods.currentState().call();
        await renderUI(user, buyer, currentState, buyerIsIn, sellerIsIn, buyerDidPay);
        await loadContractData(seller, buyer, price, currentState, buyerIsIn, sellerIsIn);
        $("#event").text(event.event);
    })  
})

const renderUI = (user, buyer, currentState, buyerIsIn, sellerIsIn, buyerDidPay) => {
    if(user.toLowerCase() === buyer.toLowerCase()){
        renderBuyerUI(currentState, buyerIsIn, sellerIsIn, buyerDidPay);
    } else if (user.toLowerCase() === seller.toLowerCase()) {
        renderSellerUI(currentState, buyerIsIn, sellerIsIn, buyerDidPay);
    } else {

        $("#UICol").remove();
    }
}

const renderSellerUI = (currentState, buyerIsIn, sellerIsIn, buyerDidPay) => {
    const UI = $("#UI");
    const cardHeader = `<h5 class="card-header">Seller Interactions</h5>`;
    const cardBodyInit = `
    <div class="card-body bg-indigo-400">
    <h5 class="card-title">Initialization</h5>
    <p class="card-text" id="#isIn">
    ${sellerIsIn === false
        ? "Not Initialized" 
        : sellerIsIn === true && buyerIsIn === false 
        ? "Successfully Initialized. Waiting for buyer to initialize."
        : buyerIsIn === true && sellerIsIn === true 
        ? "Initialization complete." : ""}
    </p>
    </div>
    `;

    const cardInitButton = `
    <button 
    class="primary btn-primary" 
    style="background: linear-gradient(90deg, rgba(116, 91, 155) 0%, rgba(136,104,179,1) 34%, rgba(116, 91, 155) 100%); border: #fff; border-radius: 5px;"
    type="submit" onclick="escrowInit()">Initialize</button>
    `;

    const cardBodyPayment = `
    <div class="card-body">
    <h5 class="card-title">Payment</h5>
    <p class="card-text">
    ${buyerDidPay === false 
        ? "Awaiting Payment" 
        : buyerDidPay === true
        ? "Payment Processed."
        : ""
    }
    </p>
    `

    const cardBodyDelivery = `
    <div class="card-body">
    <h5 class="card-title">Delivery</h5>
    <p class="card-text">
    ${currentState === "2" 
        ? "Waiting for delivery confirmation" 
        : currentState === "3"
        ? "Delivery confirmed. Contract completed." 
        : ""
    }
    </p>
    `
    UI.children().remove();
    UI.append(cardHeader);
    UI.append(cardBodyInit);
    if(currentState === "0" && sellerIsIn === false){
        UI.append(cardInitButton);
    }
    if(currentState >= "1"){
        UI.append(cardBodyPayment);
    }
    if(currentState >= "2"){
        UI.append(cardBodyDelivery);
    }
    
}

const renderBuyerUI = (currentState, buyerIsIn, sellerIsIn, buyerDidPay) => {
    const UI = $("#UI");
    const cardHeader = `<h5 class="card-header">Buyer Interactions</h5>`;
    const cardBodyInit = `
    <div class="card-body">
    <h5 class="card-title">Initialization</h5>
    <p class="card-text" id="#isIn">
    ${buyerIsIn === false
        ? "Not Initialized" 
        : buyerIsIn === true && sellerIsIn === false 
        ? "Successfully Initialized. Waiting for seller to initialize."
        : buyerIsIn === true && sellerIsIn === true 
        ? "Initialization complete." : ""}
    </p>
    </div>
    `;

    const cardInitButton = `
    <button 
    class="primary btn-primary" 
    style="background: linear-gradient(90deg, rgba(116, 91, 155) 0%, rgba(136,104,179,1) 34%, rgba(116, 91, 155) 100%); border: #fff; border-radius: 5px;"
    type="submit" onclick="escrowInit()">Initialize</button>
    `;

    const cardBodyPayment = `
    <div class="card-body">
    <h5 class="card-title">Payment</h5>
    <p class="card-text">
    ${buyerDidPay === false 
        ? "Awaiting Payment" 
        : buyerDidPay === true
        ? "Payment Processed."
        : ""
    }
    </p>
    `;

    const cardPaymentButton = `
    <button 
    class="primary btn-primary" type="submit" 
    style="background: linear-gradient(90deg, rgba(116, 91, 155) 0%, rgba(136,104,179,1) 34%, rgba(116, 91, 155) 100%); border: #fff; border-radius: 5px;"
    onclick="escrowPayment()">Payment</button>
    `;

    const cardBodyWithdraw = `
    <div class="card-body">
    <h5 class="card-title">Withdraw</h5>
    `;

    const cardWithdrawButton = `
    <button 
    class="primary btn-primary"
    style="background: linear-gradient(90deg, rgba(116, 91, 155) 0%, rgba(136,104,179,1) 34%, rgba(116, 91, 155) 100%); border: #fff; border-radius: 5px;"
     type="submit" onclick="escrowWithdraw()">Withdraw</button>
    `;

    const cardBodyDelivery = `
    <div class="card-body">
    <h5 class="card-title">Delivery</h5>
    <p class="card-text">
    ${currentState === "2" 
        ? "Waiting for delivery confirmation" 
        : currentState === "3"
        ? "Delivery confirmed. Contract completed."
        : ""
    }
    </p>
    `;

    const cardDeliveryButton = `
    <button 
    class="primary btn-primary" 
    style="background: linear-gradient(90deg, rgba(116, 91, 155) 0%, rgba(136,104,179,1) 34%, rgba(116, 91, 155) 100%); border: #fff; border-radius: 5px;"
    type="submit" onclick="escrowConfirmDelivery()">Confirm Delivery</button>
    `;

    UI.children().remove();
    UI.append(cardHeader);
    UI.append(cardBodyInit);
    if(currentState === "0" && buyerIsIn === false){
        UI.append(cardInitButton);
    }
    if(currentState >= "1"){
        UI.append(cardBodyPayment);
    }
    if(currentState === "1"){
        
        UI.append(cardPaymentButton);
    }  
    
    if(currentState === "2"){
        UI.append(cardBodyWithdraw);
        UI.append(cardWithdrawButton);
    }

    if(currentState >= "2"){
        UI.append(cardBodyDelivery);
    }
    if(currentState === "2"){
        
        UI.append(cardDeliveryButton);
    }

}

const escrowWithdraw = async () => {
    await escrow.methods.withdraw().send({from: user});
}

const escrowConfirmDelivery = async () => {
    await escrow.methods.confirmDelivery().send({from: user});
}

const escrowPayment = async () => {
    await escrow.methods.deposit().send({from: user, value: price});
}

const escrowInit = async () => {
    await escrow.methods.contractInit().send({from: user});
}

const loadContractData = (seller, buyer, price, currentState, buyerIsIn, sellerIsIn) => {
    $("#cdSeller").text(seller);
    $("#cdBuyer").text(buyer);
    $("#cdPrice").text(price / (10**18) + " ETH");
    $("#cdCurrentState").text(convertCurrentState(currentState));
    $("#cdSellerIn").text(sellerIsIn);
    $("#cdBuyerIn").text(buyerIsIn);

}

const convertCurrentState = (currentState) => {
    let stateIs;
    switch(currentState) {
        case "0":
            return stateIs = "AWAITING INITIALIZATION";
        case "1":
            return stateIs = "AWAITING PAYMENT";
        case "2":
            return stateIs = "AWAITING DELIVERY CONFIRMATION";
        case "3":
            return stateIs = "CONTRACT COMPLETED";
        default:
            return currentState;
    }

} 
const loadUserData = (user, ethScanLink) => {
    $("#spanUserAccount").html(user);
    $("#spanUserAccount").attr({'href': ethScanLink});
}