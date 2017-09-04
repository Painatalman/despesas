import React, { Component } from 'react';
import { Link } from 'react-router';

import { connect } from 'react-redux';
import {authenticate} from '../actions';

class Header extends Component {
    getAuthLinks() {
        if (this.props.authenticated) {
            return [
                (<li key="signout" className="nav-item">
                    <Link to="/signout">Logout</Link>
                </li>),
                (<li key="expenses" className="nav-item">
                    <Link to="/expenses">Expenses</Link>
                </li>)
            ];
        } else {
            return [(
                <li key="signinform" className="nav-item">
                    <Link to="/signinform">Login</Link>
                </li>),
                (<li key="registerform" className="nav-item">
                    <Link to="/registerform">Register</Link>
                </li>)];
        }
    }

    render() {
        return(
            <nav className="navbar navbar-light">
                <ul className="nav navbar-nav">
                    <li className="nav-item">
                        <Link to="/">Home</Link>
                    </li>
                    {this.getAuthLinks().map( (link) => link)}
                </ul>
            </nav>
        );
    }
}

export default connect(function mapStateToProps(state){
    return {
        authenticated: state.auth.authenticated
    }
}, {
    authenticate: authenticate
})(Header);
