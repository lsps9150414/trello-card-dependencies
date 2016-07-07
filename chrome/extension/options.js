import React from 'react';
import ReactDOM from 'react-dom';

import Trello from '../../chrome/extension/api/trelloClient';
import { TRELLO_APP_KEY } from '../../chrome/keys';

class Option extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trelloToken: null,
    };
  }
  componentWillMount() {
    console.log('componentWillMount');

    // Auth with localStorage.trello_token directly if exist.
    // console.log('before:', localStorage.trello_token, Trello.token());
    Trello.authorize({
      interactive: false,
      success: this.authenticationSuccess
    });
    // console.log('after: ', localStorage.trello_token, Trello.token());
    if (Trello.token()) {
      console.log('save trello_token to State');
      this.setState({ trelloToken: Trello.token() });
    }
  }
  loginTrello = () => {
    Trello.setKey(TRELLO_APP_KEY);
    Trello.authorize({
      type: 'redirect',
      name: 'Trello Card Dependencies',
      scope: {
        read: true,
        write: true
      },
      expiration: 'never',
      success: this.authenticationSuccess,
      error: this.authenticationFailure
    });
    this.setState({ trelloToken: Trello.token() });
  }
  logoutTrello = () => {
    Trello.deauthorize();
    this.setState({ trelloToken: null });
  }
  authenticationSuccess = () => {
    console.log('authenticationSuccess:', Trello.token());
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

ReactDOM.render(
  <Option />,
  document.querySelector('#root')
);
