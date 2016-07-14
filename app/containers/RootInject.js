import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import App from './Inject';

export default class Root extends React.Component {
  render() {
    return (
      <Provider store={this.props.store}>
        <App />
      </Provider>
    );
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired
};
