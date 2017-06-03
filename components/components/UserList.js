import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class UserList extends Component {
    componentWillMount() {
        this.props.fetchUsers();
    }

    renderUser(user) {
        return (<div className='card card-block'>
            <h4 className='card-title'>{user.name}</h4>
            <p className='card-text'>{user.description}</p>
            <a href={`mailto:${user.email}`} className='btn btn-primary'>Contact me!</a>
        </div>);
    }

    render() {
        return (<div>
            {this.props.users.map(user => this.renderUser(user))}
        </div>);
    }
}

// we could create a container component, but let's skip that for now!
export default connect(function mapStateToProps(state) {
    return {
        users: state.users
    }
}, actions)(UserList);