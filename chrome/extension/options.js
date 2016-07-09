import React from 'react';
import ReactDOM from 'react-dom';
import Root from '../../options/containers/Root';

chrome.storage.sync.get('options', obj => {
  const { options } = obj;
  const initialState = JSON.parse(options || '{}');
  console.log('initialState =', initialState);

  const createStore = require('../../options/store/configureStore');
  ReactDOM.render(
    <Root store={createStore(initialState)} />,
    document.querySelector('#root')
  );
});
