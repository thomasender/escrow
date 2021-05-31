//ACTIONS FOR REDUCER

//WEB3_LOADED

export function web3Loaded(connection){
    return {
        type: 'WEB3_LOADED',
        connection
    }

}