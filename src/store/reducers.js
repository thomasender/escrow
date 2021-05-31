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
        default: 
            return state
    }
}


const rootReducer = combineReducers({
    web3: web3,
    escrow: escrow
})

export default rootReducer;