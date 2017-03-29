import React, {Component} from 'react';

export default class ExpenseFormTitleInput extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className='expense-form__title-input'>
        <input name='title' type='text' onChange={this.props.onChange} value={this.props.value} />
      </div>
    )
  }
}