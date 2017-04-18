import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, browserHistory } from 'react-router';

import App from './components/app';
import Expenses from './components/expenses';
import About from './components/about';

import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware()(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={ browserHistory}>
      <Route path="/" component={App}>
        <Route path="expenses" component={Expenses}></Route>
        <Route path="about" component={About}></Route>
      </Route>
    </Router>
  </Provider>
  , document.querySelector('.container'));
