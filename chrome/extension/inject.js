import React from 'react';
import ReactDOM from 'react-dom';

import RootCardDepView from '../../app/containers/RootCardDepView';
import RootCardDepViewToggler from '../../app/containers/RootCardDepViewToggler';
import createStore from '../../app/store/configureStore';

chrome.storage.sync.get('app', obj => {
  const { app } = obj;
  const initialState = JSON.parse(app || '{}');
  console.log('initialState =', initialState);

  window.addEventListener('load', () => {
    const injectCardDepViewTogglerDOM = document.createElement('div');
    injectCardDepViewTogglerDOM.className = 'board-header-btn';
    document.getElementsByClassName('board-header')[0].appendChild(injectCardDepViewTogglerDOM);
    ReactDOM.render(
      <RootCardDepViewToggler store={createStore(initialState)} />,
      injectCardDepViewTogglerDOM
    );

    const injectCardDepViewDOM = document.createElement('div');
    injectCardDepViewDOM.className = 'board-canvas';
    injectCardDepViewDOM.style.display = 'none';
    document.getElementsByClassName('board-main-content')[0].appendChild(injectCardDepViewDOM);
    ReactDOM.render(
      <RootCardDepView store={createStore(initialState)} />,
      injectCardDepViewDOM
    );
  });
});
