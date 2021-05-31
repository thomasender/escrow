import Web3 from 'web3';
import Escrow from '../abis/escrow.json';
import { 
    web3Loaded,
    web3AccountLoaded,
    escrowLoaded
} from './actions';


//loadWeb3
export const loadWeb3 = async (dispatch) => {
    window.ethereum.enable();
    if(typeof window.ethereum !== 'undefined' ){
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