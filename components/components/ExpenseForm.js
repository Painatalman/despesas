import React, {Component} from 'react';
import ExpenseFormPriceInput from './ExpenseFormPriceInput';
import ExpenseFormTitleInput from './ExpenseFormTitleInput';

export default class ExpenseForm extends Component {
  constructor(props) {
    super(props);

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

  handleSubmit(e) {
    e.preventDefault();

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