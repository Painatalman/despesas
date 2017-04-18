import { SAVE_EXPENSE, CHANGE_AUTH } from './types.js';

export function saveExpense(expense) {
    return {
        type: SAVE_EXPENSE,
        payload: expense
    }
}

export function authenticate(isLoggedIn) {
    return {
        type: SAVE_EXPENSE,
        payload: isLoggedIn
    }
}