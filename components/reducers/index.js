import { combineReducers } from 'redux';
import expenseReducer from './expenses';
import authenticationReducer from './authentication';

const rootReducer = combineReducers({
  expenses: expenseReducer,
  authenticated: authenticationReducer
});

export default rootReducer;
