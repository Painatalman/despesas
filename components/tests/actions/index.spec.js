import {expect} from '../test_helper';
import {SAVE_EXPENSE} from '../../actions/types';
import {saveExpense} from '../../actions'; // it's called index... no problem!

describe('actions', () => {
    describe('saveExpense', () => {
        it('has the correct type', () => {
            const action = saveExpense();
            expect(action.type).to.equal(SAVE_EXPENSE);
        });

        it('has the correct payload', () => {
            const action = saveExpense({
                'title': 'new expense',
                'price': 34.40,
                'date': new Date()
            });

            expect(action.payload).to.deep.equal({
                'title': 'new expense',
                'price': 34.40,
                'date': new Date()
            })
        });
    })
})