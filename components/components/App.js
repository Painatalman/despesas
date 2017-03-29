import React, { Component } from 'react';

import ExpenseForm from './ExpenseForm';
import ExpenseList from './ExpenseList';

export default class App extends Component {
  render() {
    return (
      <div>
        <ExpenseForm></ExpenseForm>
        <ExpenseList></ExpenseList>
      </div>
    );
  }
}
