import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import requireAuth from './components/requireAuthentication';
import App from './components/App';
import Expenses from './components/Expenses';
import About from './components/About';
import UserList from './components/UserList';
import Home from './components/Home';

import reducers from './reducers';

import Async from './middlewares/asyncPromise';

const createStoreWithMiddleware = applyMiddleware(Async)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path='expenses' component={requireAuth(Expenses)} />
        <Route path="about" component={About}></Route>
        <Route path="users" component={requireAuth(UserList)}></Route>
      </Route>
    </Router>
  </Provider>
  , document.querySelector('.container'));
