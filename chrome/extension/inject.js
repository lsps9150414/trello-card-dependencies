import React from 'react';
import ReactDOM from 'react-dom';
import ToggleCardDependenciesView from '../../app/containers/ToggleCardDependenciesView';

console.log('inject.js');

window.addEventListener('load', () => {
  const injectDOM = document.createElement('div');
  injectDOM.className = 'board-header-btn';
  document.getElementsByClassName('board-header')[0].appendChild(injectDOM);
  ReactDOM.render(<ToggleCardDependenciesView />, injectDOM);
});
