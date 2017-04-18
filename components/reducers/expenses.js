import { SAVE_EXPENSE } from '../actions/types.js'

export default function(state = [], action) {
    switch(action.type) {
        case SAVE_EXPENSE:
          return [...state, action.payload];
    }

    return state;
}