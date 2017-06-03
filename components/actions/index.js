import { SAVE_EXPENSE, CHANGE_AUTH, FETCH_USERS } from './types.js';
import axios from 'axios';

export function saveExpense(expense) {
    return {
        type: SAVE_EXPENSE,
        payload: expense
    }
}

export function authenticate(isLoggedIn) {
    return {
        type: CHANGE_AUTH,
        payload: isLoggedIn
    }
}

export function fetchUsers() {
    // for now, let us hardcode this
    const request = axios.get('https://jsonplaceholder.typicode.com/users')

    // our asyncPromise middleware will take care of the promise,
    // no worries
    return {
        type: FETCH_USERS,
        payload: request
    }
}