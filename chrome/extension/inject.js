import ReactDOM from 'react-dom';
import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';

import createStore from '../../app/store/configureStore';
import InjectCardDepView from '../../app/containers/InjectCardDepView';
import InjectCardDepViewToggler from '../../app/containers/InjectCardDepViewToggler';
import { CHROME_SYNC_ITEMS } from '../../app/constants';

export default class Root extends React.Component {
  render() {
    return (
      <Provider store={this.props.store}>
        <div>
          <InjectCardDepViewToggler />
          <InjectCardDepView />
        </div>
      </Provider>
    );
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired
};

chrome.storage.sync.get(CHROME_SYNC_ITEMS, obj => {
  // const initialState = JSON.parse(app || '{}');
  const initialState = obj || {};
  console.log('initialState =', initialState);

  window.addEventListener('load', () => {
    const injectDOM = document.createElement('div');
    injectDOM.style.display = 'none';
    document.body.appendChild(injectDOM);
    ReactDOM.render(
      <Root store={createStore(initialState)} />,
      injectDOM
    );
  });
});
