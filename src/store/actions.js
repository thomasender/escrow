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