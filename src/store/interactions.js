import Web3 from 'web3';
import Escrow from '../abis/escrow.json';
import { 
    web3Loaded,
    web3AccountLoaded,
    escrowLoaded,
    buyerLoaded,
    sellerLoaded,
    priceLoaded,
    currentStateLoaded,
    isBuyerInLoaded,
    isSellerInLoaded,
    buyerInitialized
} from './actions';


//loadWeb3
export const loadWeb3 = async (dispatch) => {
    
    if(typeof window.ethereum !== 'undefined' ){
        window.ethereum.enable();
        const web3 = new Web3(window.ethereum);
        dispatch(web3Loaded(web3));
        return web3 
    } else {
        window.alert('Please install MetaMask')
        window.location.assign("https://metamask.io/")
    }
}

//loadAccount
export const loadAccount = async (web3, dispatch) => {
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];

    if(typeof account !== 'undefined'){
        dispatch(web3AccountLoaded(account))
        return account
    } else {
        window.alert('Please login with MetaMask')
        return null
    }
}

//loadEscrow
export const loadEscrow = async(web3, networkId, dispatch) => {

    try{
        const abi = Escrow.abi;
        const address = Escrow.networks[networkId].address;
        const escrow = new web3.eth.Contract(abi, address);
        dispatch(escrowLoaded(escrow));
        return escrow;
    } catch (error) {
        console.error(error);
        window.alert("Contract not deployed to the current network. Please select another network with Metamask.");
        return null
    }
}

//loadBuyer
export const loadBuyer = async(escrow, dispatch) => {
    const buyer = await escrow.methods.buyer().call();
    dispatch(buyerLoaded(buyer));
    return buyer;
}

//loadSeller
export const loadSeller = async(escrow, dispatch) => {
    const seller = await escrow.methods.seller().call();
    dispatch(sellerLoaded(seller));
    return seller;
}

//loadPrice
export const loadPrice = async(escrow, dispatch) => {
    const price = await escrow.methods.price().call();
    dispatch(priceLoaded(price));
    return price;
}

//loadStatus
export const loadCurrentState = async(escrow, dispatch) => {
    const currentState = await escrow.methods.currentState().call();
    dispatch(currentStateLoaded(currentState));
    return currentState;
}

//loadIsBuyerIn
export const loadIsBuyerIn = async(escrow, dispatch) => {
    const isBuyerIn = await escrow.methods.buyerIsIn().call();
    dispatch(isBuyerInLoaded(isBuyerIn));
    return isBuyerIn;
}

//loadIsSellerIn
export const loadIsSellerIn = async(escrow, dispatch) => {
    const isSellerIn = await escrow.methods.sellerIsIn().call();
    dispatch(isSellerInLoaded(isSellerIn));
    return isSellerIn;
}

//buyerInitialize
export const buyerInitialize = async(escrow, account, dispatch) => {
    await escrow.methods.contractInit().send({from: account})
    .on('transactionHash', async (hash) => {
        const isBuyerIn = await escrow.methods.buyerIsIn().call();
        dispatch(isBuyerInLoaded(isBuyerIn));
        dispatch(buyerInitialized());
        const currentState = await escrow.methods.currentState().call();
        dispatch(currentStateLoaded(currentState));

    })
    .on('error', (error) => {
        console.error(error);
        window.alert("There was an error! Check console for more information!");
    })
}

//buyerPayment
export const buyerPayment = async (escrow, account, price, web3, dispatch) => {
    await escrow.methods.deposit().send({from: account, value: price})
    .on('transactionHash', async (hash) => {
        let buyerDidPay = await escrow.methods.buyerDidPay().call();
        await dispatch(buyerDidPay(buyerDidPay));   
    })
    .on('error', (error) => {
        console.error(error);
        window.alert("There was an error! Check console for more information!");
    })
}

//sellerInitialize
export const sellerInitialize = async (escrow, account, dispatch) => {
    await escrow.methods.contractInit().send({from: account})
    .on('transactionHash', async (hash) => {
        const isSellerIn = await escrow.methods.sellerIsIn().call();
        dispatch(isSellerInLoaded(isSellerIn));
        const currentState = await escrow.methods.currentState().call();
        dispatch(currentStateLoaded(currentState));

    })
    .on('error', (error) => {
        console.error(error);
        window.alert("There was an error! Check console for more information!");
    })
}

export const subscribeToEvents = async (escrow, dispatch) => {
    escrow.events.sellerInitialized({}, (error, event) => {
        console.log(event.returnValues);
    })
    escrow.events.buyerInitialized({}, (error, event) => {

    })
    escrow.events.contractInitiated({}, (error, event) => {

    })
    escrow.events.buyerDeposit({}, (error, event) => {
        
    })
    escrow.events.deliveryConfirmed({}, (error, event) => {
        
    })
    escrow.events.buyerWithdraw({}, (error, event) => {
        
    })
}