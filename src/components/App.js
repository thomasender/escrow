import React, { Component } from 'react';
import './App.css';

import { connect } from 'react-redux';

import { 
  loadWeb3
} from '../store/interactions';


class App extends Component {

  componentDidMount() {
    this.loadBlockchainData(this.props.dispatch);
  }

  async loadBlockchainData(dispatch) {
    const web3 = await loadWeb3(dispatch);
    await web3.eth.net.getNetworkType();
    const networkId = await web3.eth.net.getId();
  }

  render() {
    return(
      <div>
        <h1>Escrow</h1>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    //FILL ME
  }
}

export default connect(mapStateToProps)(App);