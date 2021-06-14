import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';

import { 
  loadWeb3,
  loadAccount,
  loadEscrow,
  loadBuyer,
  loadSeller,
  loadPrice,
  loadCurrentState,
  loadIsBuyerIn,
  loadIsSellerIn
} from '../store/interactions';

import { 
  escrowLoadedSelector,
} from '../store/selectors'

import Content from './Content'
import Navbar from './Navbar'

class App extends Component {

  componentDidMount() {
    this.loadBlockchainData(this.props.dispatch);
  }

  async loadBlockchainData(dispatch) {
    const web3 = await loadWeb3(dispatch);
    await web3.eth.net.getNetworkType();
    
    await loadAccount(web3, dispatch);

    const networkId = await web3.eth.net.getId();

    const escrow = await loadEscrow(web3, networkId, dispatch);
    await loadBuyer(escrow, dispatch);
    await loadSeller(escrow, dispatch);
    await loadPrice(escrow, dispatch);
    await loadCurrentState(escrow, dispatch);
    await loadIsBuyerIn(escrow, dispatch);
    await loadIsSellerIn(escrow, dispatch);

    if(!escrow){
      window.alert("Contract is not deployed to this network, please choose another network!");
      return
    }
   
  }

 
  render() {
    return(
      <div>
        <Navbar />
         { this.props.escrowLoaded ? <Content /> : <h1>Loading</h1> } 
      </div>
    )
  }
}

function mapStateToProps(state){

  return {
    escrowLoaded: escrowLoadedSelector
  }
}

export default connect(mapStateToProps)(App);