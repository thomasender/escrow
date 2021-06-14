import React, { Component } from 'react'
import { connect } from 'react-redux'
import { 
    accountSelector, 
    buyerSelector, 
    escrowSelector, 
    sellerSelector,
    buyerInitializedSelector
} from '../store/selectors'


import ContractData from './ContractData'
import BuyerInteractions from './BuyerInteractions'
import SellerInteractions from './SellerInteractions'

class Content extends Component {

    componentDidMount() {
        this.loadBlockchainData(this.props);
    }

    async loadBlockchainData({ escrow, dispatch, buyerInitialized }){
  
    }

    render() {
        return (
            <div className="content">
                <div className="row">
                    <div class="col-sm">
                    <ContractData />
                    </div>
                    <div class="col-sm">
                    { this.props.account === this.props.buyer ? <BuyerInteractions /> : "" } 
                    { this.props.account === this.props.seller ? <SellerInteractions /> : "" }
                    </div>
                    <div class="col-sm">
                    <ContractData />
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
      escrow: escrowSelector(state),
      account: accountSelector(state),
      buyer: buyerSelector(state),
      seller: sellerSelector(state),
      buyerInitialized: buyerInitializedSelector(state)
    }
  }
  
  export default connect(mapStateToProps)(Content);