import { combineReducers } from 'redux';
import expenseReducer from './expenses';
import authenticationReducer from './authentication';
import userReducer from './users';

const rootReducer = combineReducers({
  expenses: expenseReducer,
  authenticated: authenticationReducer,
  users: userReducer
});

export default rootReducer;
