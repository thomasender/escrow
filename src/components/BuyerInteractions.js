import React, { Component } from 'react'
import Web3 from 'web3'
import { connect } from 'react-redux'
import {
 buyerSelector,
 escrowSelector,
 accountSelector,
 priceSelector,
 web3Selector,
 isBuyerInSelector,
 currentStateSelector,
 isSellerInSelector,
 buyerDidPaySelector
} from '../store/selectors'
import { 
    buyerInitialize,
    buyerPayment
} from '../store/interactions'

class BuyerInteractions extends Component {

    constructor(props){
        super(props);
    }

    render() {
        return (
            <div className="content">
                <div className="vertical-split">
                    <div class="card" style={{width: 250}}>
                    <h5 class="card-header">Buyer Interactions</h5>
                        <div class="card-body">
                            {/* INITIALIZATION */}
                            <h6 class="card-subtitle mb-2 text-muted">Initialization</h6>
                           { this.props.isBuyerIn === false ? 
                           <button
                            type="submit"
                            onClick={(e) => {
                                e.preventDefault();
                                buyerInitialize(this.props.escrow, this.props.account, this.props.dispatch);
                                }
                            }
                            >
                            Initialize
                            </button>
                            : this.props.isBuyerIn === true && this.props.isSellerIn === false ? <div><h5>Sucessfully initialized</h5> Waiting for Seller to initialize.</div> 
                            : this.props.isBuyerIn === true && this.props.isBuyerIn === true ? <h5>Initialization complete.</h5> : "Loading..."

                           } 
                           {/* PAYMENT */}
                            { this.props.isBuyerIn === true && this.props.isSellerIn ? <div><h6 class="card-subtitle mb-2 text-muted">Payment</h6></div> : "" }                           
                            { this.props.buyerDidPay === false ?
                            <div>
                            Awaiting payment    
                            <button
                            type="submit"
                            onClick={(e) => {
                                e.preventDefault();
                                buyerPayment(this.props.escrow, this.props.account, this.props.price, this.props.web3, this.props.dispatch);
                            }}
                            >
                            Process Payment    
                            </button></div>
                            : <h5>Payment completed</h5>
                         
                            }

                            {/* DELIVERY */}
                            { this.props.buyerDidPay === false ? <div><h6 class="card-subtitle mb-2 text-muted">Delivery</h6></div> : ""}
                            { <h5>Confirm delivery</h5>}

                            <p class="card-text"></p>
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
    escrow: escrowSelector(state),
    account: accountSelector(state),
    price: priceSelector(state),
    web3: web3Selector(state),
    isBuyerIn: isBuyerInSelector(state),
    isSellerIn: isSellerInSelector(state),
    currentState: currentStateSelector(state),
    buyerDidPay: buyerDidPaySelector(state)
    }
  }
  
  export default connect(mapStateToProps)(BuyerInteractions);