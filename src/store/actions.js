//ACTIONS FOR REDUCER

//WEB3_LOADED
export function web3Loaded(connection){
    return {
        type: 'WEB3_LOADED',
        connection
    }
}

//WEB3_ACCOUNT_LOADED
export function web3AccountLoaded(account){
    return {
        type: 'WEB3_ACCOUNT_LOADED',
        account
    }
}

//ESCROW_LOADED
export function escrowLoaded(contract){
    return {
        type: 'ESCROW_LOADED',
        contract
    }
}

//BUYER_LOADED
export function buyerLoaded(buyer){
    return {
        type: 'BUYER_LOADED',
        buyer
    }
}

//SELLER_LOADED
export function sellerLoaded(seller){
    return {
        type: 'SELLER_LOADED',
        seller
    }
}

//PRICE_LOADED
export function priceLoaded(price){
    return {
        type: 'PRICE_LOADED',
        price
    }
}

//STATUS_LOADED
export function currentStateLoaded(currentState){
    return {
        type: 'CURRENT_STATE_LOADED',
        currentState
    }
}

//IS_BUYER_IN_LOADED
export function isBuyerInLoaded(isBuyerIn){
    return {
        type: 'IS_BUYER_IN_LOADED',
        isBuyerIn
    }
}

//IS_SELLER_IN_LOADED
export function isSellerInLoaded(isSellerIn){
    return {
        type: 'IS_SELLER_IN_LOADED',
        isSellerIn
    }
}

//BUYER_INITIALIZED
export function buyerInitialized(){
    return {
        type: 'BUYER_INITIALIZED'
    }
}

//BUYER_DID_PAY
export function buyerDidPay(buyerDidPay){
    return {
        type: 'BUYER_DID_PAY',
        buyerDidPay
    }
}