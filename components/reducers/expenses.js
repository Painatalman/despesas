import { SAVE_EXPENSE, FETCH_EXPENSES } from '../actions/types.js'

export default function(state = [], action) {
    switch(action.type) {
        case SAVE_EXPENSE:
          return [action.payload, ...state];
        case FETCH_EXPENSES:
          return [...action.payload];
    }

    return state;
}