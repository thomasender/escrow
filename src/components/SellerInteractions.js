import React, { Component } from 'react'
import Web3 from 'web3'
import { connect } from 'react-redux'
import {
 sellerSelector,
 escrowSelector,
 accountSelector,
 priceSelector,
 web3Selector,
 isBuyerInSelector,
 currentStateSelector,
 isSellerInSelector
} from '../store/selectors'
import { 
    sellerInitialize
} from '../store/interactions'


class SellerInteractions extends Component {

    render() {
        return (
            <div className="content">
                <div className="vertical-split">
                    <div class="card" style={{width: 250}}>
                    <h5 class="card-header">Seller Interactions</h5>
                        <div class="card-body">
                            {/* INITIALIZATION */}
                            <h6 class="card-subtitle mb-2 text-muted">Initialization</h6>
                           { this.props.isSellerIn === false ? 
                           <button
                            type="submit"
                            onClick={(e) => {
                                e.preventDefault();
                                sellerInitialize(this.props.escrow, this.props.account, this.props.dispatch);
                                }
                            }
                            >
                            Initialize
                            </button>
                            : this.props.isSellerIn === true && this.props.isBuyerIn === false ? <div><h5>Successfully initialized</h5>Waiting for Buyer to initialize</div> 
                            : this.props.isSellerIn === true && this.props.isBuyerIn === true ? <h5>Initialization complete.</h5> : "Loading..."
                           } 
                           
                           {/* PAYMENT */}
                           { this.props.isSellerIn === true && this.props.isBuyerIn === true ? <div><h6 class="card-subtitle mb-2 text-muted">Payment</h6></div> : "" }
                           { this.props.buyerDidPay === true ? <h5>Payment processed! Buyer is waiting for delivery.</h5> : "Waiting for Buyer to process payment..." }
                           
                           {/* DELIVERY */}
                           { this.props.isSellerIn === true && this.props.isBuyerIn === true ? <div><h6 class="card-subtitle mb-2 text-muted">Delivery</h6><h5>Buyer is waiting for delivery.</h5></div> : "" }
                           
                           
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
    seller: sellerSelector(state),
    escrow: escrowSelector(state),
    account: accountSelector(state),
    price: priceSelector(state),
    web3: web3Selector(state),
    isBuyerIn: isBuyerInSelector(state),
    isSellerIn: isSellerInSelector(state),
    currentState: currentStateSelector(state)
    }
  }
  
  export default connect(mapStateToProps)(SellerInteractions);