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

// step 1 to convert this into a redux container component...
// import the 'connect'
import { connect } from 'react-redux';

const ExpenseList = (props) => {
    return (
        <ul className='expense-list'>
            {props.expenses.map( (expense) => <ExpenseListItem title={expense.title} price={expense.price}></ExpenseListItem>)}
        </ul>
    )
};

ExpenseList.defaultProps = {
    expenses: []
}

// get the state from the store
function mapStateToProps(state) {
    return { expenses: state.expenses };
}

// the first parameter is 'mapStateToProps'
export default connect(mapStateToProps)(ExpenseList);