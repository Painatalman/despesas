import React from 'react';

import { storiesOf, action, linkTo } from '@kadira/storybook';

import {Provider} from 'react-redux';
import {createStore} from 'redux';
// loads index automatically
import reducers from '../components/reducers';

import ExpenseForm from '../components/components/ExpenseForm';

storiesOf('Expense Form', module)
  .add('Default', () => (
    <Provider store={createStore(reducers, {})}>
      <ExpenseForm/>
    </Provider>
  ));

