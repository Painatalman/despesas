/*
Expense List Item component

Shows an expense item as a list item element

Here's what it should do:

- have an expense-list__item className
- show its price and title and date (as text?)
- should have ??? as default price and ??? as default title
*/

import React from 'react';

const ExpenseListItem = (props) => {
    return (
        <li className='expense-list__item'>
            {props.title} - {props.price} - {props.date}
        </li>
    )
};

export default ExpenseListItem;