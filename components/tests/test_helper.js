import jsdom from 'jsdom';
import jquery from 'jquery';
import chai from 'chai';
import chaiJquery from 'chai-jquery';
import TestUtils from 'react-addons-test-utils';
import ReactDOM from 'react-dom';
import React from 'react';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
// loads index automatically
import reducers from '../reducers';

// Set up testing environment to run like a browser in the command line
global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = global.document.defaultView;

const $ = jquery(global.window);
const expect = chai.expect;

// Build 'renderComponent' helper that should render a given react class
function renderComponent(ComponentClass, props, state) {
  const componentInstance = TestUtils.renderIntoDocument(
    <Provider store={createStore(reducers, state)}>
      <ComponentClass {...props} />
    </Provider>
  );

  // produces html from the instance
  // and then convert it to a jQuery object
  return $(ReactDOM.findDOMNode(componentInstance)); 
}

// Build helper for simulating events
// and we must add it to our instance of jquery
// as a method, like this
// $('div').simulate('click');
$.fn.simulate = function(eventName, value) {
  if (value) {
    // remember: 'this' is a jQuery instance
    this.val(value);
  }
  // 'this' is the element itself... in jQuery
  // so it can also be a collection of elements...
  TestUtils.Simulate[eventName](this[0]);
}

// Set up chai-jquery
chaiJquery(chai, chai.util, $);

export { renderComponent, expect };
