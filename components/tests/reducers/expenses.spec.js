import { expect } from '../test_helper';

import expenseReducer from '../../reducers/expenses';
import { SAVE_EXPENSE } from '../../actions/types'; 

describe('Expenses Reducer', () => {
    it('handles action with unknown type', () => {
        expect(expenseReducer(undefined, {})).to.deep.equal([])
    })

    it('handles the SAVE_EXPENSE action by adding an action to the list', () => {
        const expense = {
            'title': 'new expense',
            'price': 34.40,
            'date': new Date()
        }
        
        const action = {
            type: SAVE_EXPENSE,
            payload: expense
        }

        expect(expenseReducer([], action)).to.deep.equal([expense])
    })
})