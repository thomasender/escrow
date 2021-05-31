import Web3 from 'web3';
import Escrow from '../abis/escrow.json';
import { 
    web3Loaded
} from './actions';

export const loadWeb3 = async (dispatch) => {
    window.ethereum.enable();
    if(typeof window.ethereum !== 'undefined' ){
        const web3 = new Web3(window.ethereum);
        console.log(web3);
        dispatch(web3Loaded(web3));
        return web3 
    } else {
        window.alert('Please install MetaMask')
        window.location.assign("https://metamask.io/")
    }
}