import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';

import { 
  loadWeb3,
  loadAccount,
  loadEscrow
} from '../store/interactions';

import { 
  escrowLoadedSelector
} from '../store/selectors'


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

    if(!escrow){
      window.alert("Contract is not deployed to this network, please choose another network!");
      return
    }
   
  }

 
  render() {
    return(
      <div>
         <h1>Escrow</h1>
        { this.props.escrowLoaded ? <h1>Contract Loaded!</h1> : <h1>Contract NOT Loaded!</h1>}
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