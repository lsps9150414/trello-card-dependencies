import React from 'react';
import ReactDOM from 'react-dom';

import createStore from '../../app/store/configureStore';
import Root from '../../app/containers/RootOptions';

chrome.storage.sync.get('app', obj => {
  const { app } = obj;
  const initialState = JSON.parse(app || '{}');
  console.log('initialState =', initialState);

  ReactDOM.render(
    <Root store={createStore(initialState)} />,
    document.querySelector('#root')
  );
});
