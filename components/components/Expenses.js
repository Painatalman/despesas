import React from 'react';

import ExpenseForm from './ExpenseForm';
import ExpenseList from './ExpenseList';

export default () => {
    return (
        <div className="expense-page">
            <ExpenseForm></ExpenseForm>
            <ExpenseList></ExpenseList>
        </div>
    )
}