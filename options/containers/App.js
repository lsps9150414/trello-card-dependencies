import React, { PropTypes } from 'react';

import Trello from '../../chrome/extension/utils/trelloClient';
// import { TRELLO_APP_KEY } from '../../chrome/keys';
import { trelloLogout } from '../../chrome/extension/utils/trelloApi';
import { loginTrello } from '../actions/options';
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
    // Auth with localStorage.trello_token directly if exist.
    Trello.authorize({
      interactive: false,
      success: this.authenticationSuccess
    });

    // TODO: Move to authenticationSuccess.
    if (Trello.token()) {
      chrome.storage.sync.set(
        { trello_token: Trello.token() },
        () => { console.log('save trello_token to chrome storage'); }
      );
      this.setState({ trelloToken: Trello.token() });
    }
  }
  loginTrello = () => {
    this.props.loginTrello(this.authenticationSuccess, this.authenticationFailure, 'redirect');
    // trelloLogin(
    //   TRELLO_APP_KEY, 'Trello Card Dependencies',
    //   this.authenticationSuccess, this.authenticationFailure, 'redirect'
    // );
  }
  logoutTrello = () => {
    trelloLogout();
    chrome.storage.sync.remove(
      'trello_token',
      () => { console.log('trello_token removed from chrome storage'); }
    );
    this.setState({ trelloToken: null });
  }
  authenticationSuccess = () => {
    console.log('authenticationSuccess! Token =', Trello.token());
    this.setState({ trelloToken: Trello.token() });
  }
  authenticationFailure = () => {
    console.log('authenticationFailure');
  }
  render() {
    const content = this.state.trelloToken ? (
      <button onClick={this.logoutTrello}>Logout Trello</button>
    ) : (
      <button onClick={this.loginTrello}>Login Trello</button>
    );
    return (
      <div>
        <h1>Settings</h1>
        {content}
      </div>
    );
  }
}

Option.propTypes = {
  loginTrello: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({

});
const mapDispatchToProps = (dispatch) => ({
  loginTrello: (successCallback, errCallback, type) => {
    dispatch(loginTrello(successCallback, errCallback, type));
  }
});
const OptionContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Option);

export default Option;
