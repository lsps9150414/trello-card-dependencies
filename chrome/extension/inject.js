import ReactDOM from 'react-dom';
import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';

import createStore from '../../app/store/configureStore';
import InjectCardDepView from '../../app/containers/InjectCardDepView';
import InjectCardDepViewToggler from '../../app/containers/InjectCardDepViewToggler';

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

chrome.storage.sync.get('app', obj => {
  const { app } = obj;
  const initialState = app || {};
  // const initialState = JSON.parse(app || '{}');
  console.log('initialState =', initialState);

  window.addEventListener('load', () => {
    const injectDOM = document.createElement('div');
    injectDOM.style.display = 'none';
    document.getElementsByTagName('body')[0].appendChild(injectDOM);
    ReactDOM.render(
      <Root store={createStore(initialState)} />,
      injectDOM
    );
  });
});
