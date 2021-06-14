import React, { Component } from 'react'
import { connect } from 'react-redux'
import { accountSelector } from '../store/selectors'

class Navbar extends Component {
    render() {
        return (
            <div>
                <nav class="navbar navbar-light bg-light">
              
                        <img src="https://avatars.githubusercontent.com/u/35362810?v=4" width="30" height="30" class="d-inline-block align-top" alt="" />
                        Escrow Contract
            
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <span className="navbar-text">Connected with account: 
                            <a
                            className="nav-link small"
                            href={`https://etherscan.io/address/${this.props.account}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            >
                                { this.props.account }
                            </a>
                            </span>
                        </li>

                    </ul>
                </nav>
            </div>
        )
    }
}

function mapStateToProps(state){

    return {
        account: accountSelector(state)
    }
  }
  
  export default connect(mapStateToProps)(Navbar);