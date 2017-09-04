/**
 * User sign-in form
 *
 * - must have an input for username
 * - must have an input for password
 * - must send a valid username and password
 * - must respond with an error message when authentication is not successful
 */

import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../actions';

class SignInForm extends Component {
  // The submitted data is passed as JSON object to your onSubmit function
  handleFormSubmit({username, password}) {
    this.props.signinUser({username, password});
  }

  renderAlert() {
    return this.props.errorMessage ? <div className='alert alert-danger'>{this.props.errorMessage}</div> : '';
  }

  render() {
    // props provided by redux-forms... magic!
    const { handleSubmit } = this.props;

    return (
      // The submitted data is passed as JSON object to your onSubmit function
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <fieldset className='form-group'>
          <label>Username:</label>
          <Field name='username' className='form-control'  component="input"/>
        </fieldset>
        <fieldset className='form-group'>
          <label>Password:</label>
          <Field name='password' className='form-control' type='password' component="input" />
        </fieldset>
        {this.renderAlert()}
        <button action='submit'>sign in</button>
      </form>
    )
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error
  }
}

function mapDispatchToProps(dispatch) {
  return actions
}

export default reduxForm({
  form: 'signinform'
})(connect(
  mapStateToProps,
  actions)(SignInForm)
)
