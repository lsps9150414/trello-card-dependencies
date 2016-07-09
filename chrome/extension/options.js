import React from 'react';
import ReactDOM from 'react-dom';
import Root from '../../options/containers/Root';

// chrome.storage.local.get('state', obj => {
//   const { state } = obj;
//   const initialState = JSON.parse(state || '{}');
//
//   const createStore = require('../../options/store/configureStore');
//   ReactDOM.render(
//     <Root store={createStore(initialState)} />,
//     document.querySelector('#root')
//   );
// });

const initialState = {};

const createStore = require('../../options/store/configureStore');
ReactDOM.render(
  <Root store={createStore(initialState)} />,
  document.querySelector('#root')
);
