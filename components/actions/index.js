import { SAVE_EXPENSE, AUTH_USER, UNAUTH_USER, AUTH_ERROR, FETCH_EXPENSES } from './types.js';
import axios from 'axios';

import {browserHistory} from 'react-router';

export function saveExpense(expense) {
  return function(dispatch) {
    axios
      .post('/movimentos/new', {
        expense
      }, {
        headers: {
          authorization: localStorage.getItem('token')
        }
      })
      .then(response => {
        dispatch(
          {
            type: SAVE_EXPENSE,
            payload: expense
          }
        )
      });
  }    
}

export function authenticate(isLoggedIn) {
    return {
        type: AUTH_USER,
        payload: isLoggedIn
    }
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  }
}

export function signinUser({username, password}) {
  return function(dispatch) {
      // we can do any asynchronous request or whatever
      // it allows us to dispatch any type of action
      // check if the request is good or bad, for example
      // we are not limited to ONE dispatch, with Redux-thunk
      axios
       .post('/users/login', {username, password})
       .then(response => {
         // if request is good
         // - update the state of authentication
         dispatch({type: AUTH_USER})
         // - save the JWT token
         localStorage.setItem('token', response.data.token);
         // - where? On localstorage
         // - redirect to HOME
         browserHistory.push('/');
       })
       .catch(() => {
         dispatch(authError('Bad Login Info'));
       });
  }
}

export function registerUser({username, password}) {
  return function(dispatch) {
      // we can do any asynchronous request or whatever
      // it allows us to dispatch any type of action
      // check if the request is good or bad, for example
      // we are not limited to ONE dispatch, with Redux-thunk
      axios
       .post('/users/register', {username, password})
       .then(response => {
         // if request is good
         // - update the state of authentication
         if (response.data.errors && response.data.errors.length) {
          dispatch(authError(`Unable to register ${response.data.errors.join(' - ')}`));
         } else {
            dispatch({type: AUTH_USER})
            // - save the JWT token
            localStorage.setItem('token', response.data.token);
            // - where? On localstorage
            // - redirect to HOME
            browserHistory.push('/');
         }
         
       })
       .catch(() => {
         dispatch(authError('Unable to register'));
       });
  }
}

export function signoutUser() {
  localStorage.removeItem('token');

  return {
    type: UNAUTH_USER
  };
}

export function fetchExpenses() {
  return function(dispatch) {
    axios.get('/movimentos',{
      headers: {authorization: localStorage.getItem('token')}
    })
      .then(response => {
        dispatch({
          type: FETCH_EXPENSES,
          payload: response.data
        })
      })
  }
}
