import { combineReducers } from 'redux';

//web3 reducer
function web3(state = {}, action ){
    switch(action.type){
        case 'WEB3_LOADED':
            return { ...state, connection: action.connection }
        case 'WEB3_ACCOUNT_LOADED':
            return { ...state, account: action.account }
        default:
            return state
    }
}

//escrow reducer
function escrow(state = {}, action){
    switch(action.type){
        case 'ESCROW_LOADED':
            return { ...state, loaded: true, contract: action.contract }
        case 'BUYER_LOADED':
            return { ...state, loaded: true, buyer: action.buyer }
        case 'SELLER_LOADED':
            return { ...state, loaded: true, seller: action.seller }
        case 'PRICE_LOADED':
            return { ...state, loaded: true, price: action.price }
        case 'CURRENT_STATE_LOADED':
            return { ...state, loaded: true, currentState: action.currentState }
        case 'IS_BUYER_IN_LOADED':
            return { ...state, loaded: true, isBuyerIn: action.isBuyerIn }
        case 'IS_SELLER_IN_LOADED':
            return { ...state, loaded: true, isSellerIn: action.isSellerIn }
        case 'BUYER_INITIALIZED':
            return { ...state, initialized: true, buyerInitialized: action.buyerInitialized}
        case 'BUYER_DID_PAY':
            return { ...state, buyerDidPay: action.buyerDidPay }
        default: 
            return state
    }
}


const rootReducer = combineReducers({
    web3: web3,
    escrow: escrow
})

export default rootReducer;