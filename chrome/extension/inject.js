import React from 'react';
import ReactDOM from 'react-dom';
import RootCardDepViewToggler from '../../app/containers/RootCardDepViewToggler';
import RootCardDepView from '../../app/containers/RootCardDepView';
import {initialState as trelloInitialState} from '../../app/reducers/trello';

chrome.storage.sync.get('app', obj => {
  const { app } = obj;
  const initialState = JSON.parse(app || '{}');
  if (initialState.trello === undefined) {
    initialState.trello = trelloInitialState;
  }
  console.log('initialState =', initialState);

  const createStore = require('../../app/store/configureStore');

  window.addEventListener('load', () => {
    const injectDOM = document.createElement('div');
    injectDOM.className = 'board-header-btn';
    document.getElementsByClassName('board-header')[0].appendChild(injectDOM);
    ReactDOM.render(
      <RootCardDepViewToggler store={createStore(initialState)} />,
      injectDOM
    );

    const injectDependenciesViewDOM = document.createElement('div');
    injectDependenciesViewDOM.className = 'board-canvas';
    injectDependenciesViewDOM.style.display = 'none';
    document.getElementsByClassName('board-main-content')[0].appendChild(injectDependenciesViewDOM);
    ReactDOM.render(
      <RootCardDepView store={createStore(initialState)} />,
      injectDependenciesViewDOM
    );
  });
});
