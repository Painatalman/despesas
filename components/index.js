import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import requireAuth from './components/requireAuthentication';
import App from './components/App';
import Expenses from './components/Expenses';
import About from './components/About';
import UserList from './components/UserList';
import Home from './components/Home';

import SignInForm from './components/SignInForm';
import SignUpForm from './components/SignUpForm';
import SignOutBlock from './components/SignOutBlock';

import reducers from './reducers';
import { AUTH_USER } from './actions/types';

// import Async from './middlewares/asyncPromise';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let store;

if (composeEnhancers) {
  store = createStore(reducers, composeEnhancers(applyMiddleware(ReduxThunk)));
} else {
  store = applyMiddleware(ReduxThunk)(createStore)(reducers);
}

const token = localStorage.getItem('token');

if (token) {
  // we need access to dispatch
  // SUPRISE! You can access it by the store
  // authenticate BEFORE you render the app
  store.dispatch({
    type: AUTH_USER
  })
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path='expenses' component={requireAuth(Expenses)} />
        <Route path="about" component={About} />
        <Route path="registerform" component={SignUpForm} />
        <Route path="signinform" component={SignInForm} />
        <Route path="signout" component={SignOutBlock} />
      </Route>
    </Router>
  </Provider>
  , document.querySelector('.container'));
