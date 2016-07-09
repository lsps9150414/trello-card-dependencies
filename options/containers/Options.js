import React, { PropTypes } from 'react';

import { loginTrello, logoutTrello, tryAuthTrello } from '../actions/trello';
import { connect } from 'react-redux';

class Option extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trelloToken: null,
    };
  }
  componentWillMount() {
    console.log('componentWillMount');
    // TODO: Look for token in chrome.storage.sync. If exist then save to localstorage.
    console.log(localStorage.trello_token);
    console.log('this.props.trelloToken', this.props.trelloToken, typeof this.props.trelloToken);
    if (this.props.trelloToken !== null) {
      localStorage.trello_token = this.props.trelloToken;
    }
    console.log(localStorage.trello_token);
    this.props.tryAuthTrello(this.authenticationSuccess, this.authenticationFailure);
  }

  loginTrello = () => {
    this.props.loginTrello(this.authenticationSuccess, this.authenticationFailure, 'redirect');
  }
  logoutTrello = () => {
    this.props.logoutTrello();
    this.setState({ trelloToken: null });
  }

  authenticationSuccess = () => {
    console.log('authenticationSuccess');
  }
  authenticationFailure = () => {
    console.log('authenticationFailure');
  }

  render() {
    const content = this.props.trelloToken ? (
      <button onClick={this.logoutTrello}>Logout Trello</button>
    ) : (
      <button onClick={this.loginTrello}>Login Trello</button>
    );
    return (
      <div>
        <h1>Settings</h1>
        {content}
        {this.props.trelloToken}
      </div>
    );
  }
}

Option.propTypes = {
  loginTrello: PropTypes.func.isRequired,
  logoutTrello: PropTypes.func.isRequired,
  tryAuthTrello: PropTypes.func.isRequired,
  trelloToken: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]),
};

const mapStateToProps = (state) => ({
  trelloToken: state.trello.token,
});
const mapDispatchToProps = (dispatch) => ({
  tryAuthTrello: (successCallback, errCallback) => {
    dispatch(tryAuthTrello(successCallback, errCallback));
  },
  loginTrello: (successCallback, errCallback, type) => {
    dispatch(loginTrello(successCallback, errCallback, type));
  },
  logoutTrello: () => { dispatch(logoutTrello()); },
});
const OptionContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Option);

export default OptionContainer;
