import React, { Component } from 'react';
import { Link } from 'react-router';

import { connect } from 'react-redux';
import {authenticate} from '../actions';

class Header extends Component {
    authButton() {
        if (this.props.authenticated) {
            return <button onClick={() => this.props.authenticate(false)}>Sign Out</button>
        } else {
            return <button onClick={() => this.props.authenticate(true)}>Sign In</button>
        }
        
    }
    render() {
        return(
            <nav className="navbar navbar-light">
                <ul className="nav navbar-nav">
                    <li className="nav-item">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/expenses">Expenses</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/users">Users</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/about">About</Link>
                    </li>
                    <li className="nav-item">
                        {this.authButton()}
                    </li>  
                </ul>
            </nav>
        );
    }
}

export default connect(function mapStateToProps(state){
    return {
        authenticated: state.authenticated
    }
}, {
    authenticate: authenticate
})(Header);