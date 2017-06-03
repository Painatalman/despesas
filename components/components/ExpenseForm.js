import React, {Component} from 'react';
import ExpenseFormPriceInput from './ExpenseFormPriceInput';
import ExpenseFormTitleInput from './ExpenseFormTitleInput';

// step 1 to convert this into a redux container component...
// import the 'connect'
import { connect } from 'react-redux';
import * as actions from '../actions';

class ExpenseForm extends Component {
  constructor(props) {
    super(props);

    // remember: local state is FINE
    this.state = {
      title: '',
      price: ''
    }
  }

  handlePriceChange(e) {
    this.setState({
      price: e.target.value
    })
  }

  handleTitleChange(e) {
    this.setState({
      title: e.target.value
    })
  }

  handlePrinceInputBlur() {
    this.setState({
      price: parseFloat(this.state.price).toFixed(2)
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    // provided by connect
    this.props.saveExpense({
      title: this.state.title,
      price: this.state.price
    });

    this.setState({
      title: '',
      price: ''
    })
  }

  render() {
    return (
      <form className='expense-form' method='POST' onSubmit={this.handleSubmit.bind(this)}>
        <ExpenseFormPriceInput
          value={this.state.price}
          onChange={this.handlePriceChange.bind(this)}
          onBlur={this.handlePrinceInputBlur.bind(this)}
        />
        <ExpenseFormTitleInput 
          value={this.state.title}
          onChange={this.handleTitleChange.bind(this)}
        />
        <button type="submit">Submit</button> 
      </form>
    )
  }
}

// the first parameter is 'mapStateToProps'
// the second parameter... is actions
export default connect(null, actions)(ExpenseForm);