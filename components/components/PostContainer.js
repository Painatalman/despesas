import React, { Component } from 'react';

import { connect } from 'react-redux';

class App extends Component {
    render() {
        return {
            <div>React simple starter</div>
        }
    }
}


// we'd do this if we wanted to connect our props and actions directly
// to the provider
// connect generates a higher-order component that responds to the provider
// this provider, on itself, has the store wrapped around it
export default connect(function mapStateToProps(state) {
    return {
        posts: state.posts
    }
})(App);