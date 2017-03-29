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

import { renderComponent , expect } from '../test_helper';
import ExpenseList from '../../components/ExpenseList';

describe('Expense List', () => {
    let component;
    let dummyData = {
        expenses: [
            {
                price: 32.00,
                title: 'shopping at Continente',
                date: '2016-09-10'
            },
            {
            price: 34.00,
            title: 'new videogame',
            date: '2016-10-10'
        }
        ]
    };

    beforeEach(() => {
        component = renderComponent(ExpenseList, null, dummyData);
    });

    it('shows an li with the "expense-list__item" for each expense', () => {
        expect(component.find('li.expense-list__item').length).to.equal(2);
    });

    it('shows each expense that is provided', () => {
        expect(component).to.contain('shopping at Continente');
        expect(component).to.contain('new videogame');
    });
})

