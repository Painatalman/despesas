import React, {Component} from 'react';

export default class ExpenseFormPriceInput extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className='expense-form__price-input'>
        <input type='number' name='price' onChange={this.props.onChange} value={this.props.value} />
      </div>
    )
  }
}