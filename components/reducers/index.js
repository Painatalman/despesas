import { combineReducers } from 'redux';
import expenseReducer from './expenses';
import authenticationReducer from './authentication';
import userReducer from './users';

// this part relates to the SignInForm
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  expenses: expenseReducer,
  auth: authenticationReducer,
  users: userReducer,
  form: formReducer
});

export default rootReducer;
