/*
Expense List component

Lists some expenses

Here's what it should do:

- have an expense-list className
- render expenses inside li elements
- show all expenses, given a list of them
- should have a props called expenses, that is [] by default
- show the title and price of each expense, but this is for the expenseListItem, as well
- TODO: show values based on a filter for the month and year
*/

import React from 'react';

import ExpenseListItem from './ExpenseListItem';

const ExpenseList = (props) => {
    return (
        <ul className='expense-list'>
            {props.expenses.map( (expense) => <ExpenseListItem key={expense._id} title={expense.title} price={expense.value}></ExpenseListItem>)}
        </ul>
    )
};

ExpenseList.defaultProps = {
    expenses: []
}

export default ExpenseList;