import React, { Component } from 'react';
import { Link } from 'react-router';

class Header extends Component {
    authButton() {
        return <button>Sign In</button>
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

export default Header;