import React, { Component } from 'react';
import Header from './Header';

// your child routes will NOT be rendered if you do not add them
// as children, dummy!
export default class App extends Component {
  render() {
    return (
      <div>
        <Header></Header>
        {this.props.children}
      </div>
    );
  }
}
