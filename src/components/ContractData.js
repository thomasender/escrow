import React, { Component } from 'react'
import Web3 from 'web3'
import { connect } from 'react-redux'
import {
 buyerSelector,
 sellerSelector,
 priceSelector,
 currentStateSelector,
 isBuyerInSelector,
 isSellerInSelector,
 web3Selector
} from '../store/selectors'

const convertCurrentState = (currentState) => {
    let stateIs;
    switch(currentState){
        case "0":
            return stateIs = "AWAITING INITIALIZATION"
        case "1":
            return stateIs = "AWAITING PAYMENT"
        case "2":
            return stateIs = "AWAITING DELIVERY CONFIRMATION"
        case "3": 
            return stateIs = "CONTRACT COMPLETED"
        default:
            return stateIs = "Current state not defined - there was an error occured!";
    }
}


class ContractData extends Component {

    render() {
        return (
            <div className="content">
                <div className="vertical-split">
                    <div class="card" style={{width: 250}}>
                    <h5 class="card-header">Contract Data</h5>
                        <div class="card-body">
                            <h6 class="card-subtitle mb-2 text-muted">Seller</h6>
                            <p class="card-text">{this.props.seller}</p>
                            <h6 class="card-subtitle mb-2 text-muted">Buyer</h6>
                            <p class="card-text">{this.props.buyer}</p>
                            <h6 class="card-subtitle mb-2 text-muted">Price</h6>
                            <p class="card-text">{this.props.price/(10**18)} ETH</p>
                            <h6 class="card-subtitle mb-2 text-muted">Status</h6>
                            <p class="card-text">{this.props.currentState ? convertCurrentState(`${this.props.currentState}`) : null}</p>
                            <h6 class="card-subtitle mb-2 text-muted">Is Buyer In?</h6>
                            <p class="card-text">{!this.props.isBuyerIn ? <h6>Buyer is not in</h6> : <h6>Buyer is in</h6>}</p>
                            <h6 class="card-subtitle mb-2 text-muted">Is Seller In?</h6>
                            <p class="card-text">{!this.props.isSellerIn ? <h6>Seller is not in</h6> : <h6>Seller is in</h6>}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
     buyer: buyerSelector(state),
     seller: sellerSelector(state),
     price: priceSelector(state),
     currentState: currentStateSelector(state),
     isBuyerIn: isBuyerInSelector(state),
     isSellerIn: isSellerInSelector(state),
     web3Selector: web3Selector(state)
    }
  }
  
  export default connect(mapStateToProps)(ContractData);