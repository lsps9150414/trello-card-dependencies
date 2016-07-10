import React from 'react';
import ReactDOM from 'react-dom';
import Root from '../../app/containers/RootOptions';

chrome.storage.sync.get('app', obj => {
  const { app } = obj;
  const initialState = JSON.parse(app || '{}');
  console.log('initialState =', initialState);

  const createStore = require('../../app/store/configureStore');
  ReactDOM.render(
    <Root store={createStore(initialState)} />,
    document.querySelector('#root')
  );
});
