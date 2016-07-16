import React from 'react';
import ReactDOM from 'react-dom';

import createStore from '../../app/store/configureStore';
import Root from '../../app/containers/RootOptions';
import { CHROME_SYNC_ITEMS } from '../../app/constants';

chrome.storage.sync.get(CHROME_SYNC_ITEMS, obj => {
  // console.log(obj);
  // console.log(obj.trelloCredentials);
  // const initialState = JSON.parse(app || '{}');
  const initialState = obj || {};
  console.log('initialState =', initialState);

  ReactDOM.render(
    <Root store={createStore(initialState)} />,
    document.querySelector('#root')
  );
});
