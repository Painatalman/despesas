import React, {Component} from 'react';

export default class ExpenseFormPriceInput extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='expense-form__price-input'>
        <input type='text' name='price' onChange={this.props.onChange} onBlur={this.props.onBlur} value={this.props.value} />
      </div>
    )
  }
}