import React from 'react';
import ReactDOM from 'react-dom';
import Root from '../../app/containers/RootInject';

chrome.storage.sync.get('app', obj => {
  const { app } = obj;
  const initialState = JSON.parse(app || '{}');
  console.log('initialState =', initialState);

  const createStore = require('../../app/store/configureStore');

  window.addEventListener('load', () => {
    const injectDOM = document.createElement('div');
    injectDOM.className = 'board-header-btn';
    document.getElementsByClassName('board-header')[0].appendChild(injectDOM);
    ReactDOM.render(
      <Root store={createStore(initialState)} />,
      injectDOM
    );
  });
});
