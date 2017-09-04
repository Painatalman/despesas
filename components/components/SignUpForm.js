import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../actions';

const renderInput = (field) => {
  const { label, type, input, meta: {error, touched} } = field;

  return (
    <div>
      <label>
        {label}
      </label>
      <input {...input} type={type} className="form-control" />
      {touched && error && <div className='error'>{error}</div>}
    </div>
  )
}

class SignUpForm extends Component {
  // The submitted data is passed as JSON object to your onSubmit function
  handleFormSubmit(formProps) {
    this.props.registerUser(formProps);
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
          <Field name='username' className='form-control'  component={renderInput} />
        </fieldset>
        <fieldset className='form-group'>
          <label>Password:</label>
          <Field name='password' className='form-control' type='password' component={renderInput} />
        </fieldset>
        <fieldset className='form-group'>
          <label>Password Confirmation:</label>
          <Field name='password-confirmation' className='form-control' type='password' component={renderInput} />
        </fieldset>
        {this.renderAlert()}
        <button action='submit'>sign up</button>
      </form>
    )
  }
}

function validate(formProps) {
  const errors = {};

  if (!formProps.username) {
    errors.username = 'Really? No username?';
  }

  if (!formProps.password) {
    errors.password = 'Really? No password?';
  }

  if (formProps['password-confirmation'] !== formProps.password) {
    errors.password = 'Passwords must match';
  }

  return errors;
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
  form: 'signupform',
  validate
})(connect(
  mapStateToProps,
  actions)(SignUpForm)
);
