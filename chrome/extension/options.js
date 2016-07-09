import React from 'react';
import ReactDOM from 'react-dom';
import Root from '../../options/containers/Root';

chrome.storage.sync.get('state', obj => {
  console.log('obj =', obj);
  const { state } = obj;
  console.log('state =', state);
  const
  const optionState = state.options !== undefined ? state.options : {};
  const initialState = JSON.parse(optionState);

  const createStore = require('../../options/store/configureStore');
  ReactDOM.render(
    <Root store={createStore(initialState)} />,
    document.querySelector('#root')
  );
});

// const initialState = {};
//
// const createStore = require('../../options/store/configureStore');
// ReactDOM.render(
//   <Root store={createStore(initialState)} />,
//   document.querySelector('#root')
// );
