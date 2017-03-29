import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  expenses: (state = []) => state
});

export default rootReducer;
