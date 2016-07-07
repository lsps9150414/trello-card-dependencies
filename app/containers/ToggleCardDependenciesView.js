import React, { Component } from 'react';

import Trello from '../../chrome/extension/api/trelloClient';
import { TRELLO_APP_KEY } from '../../chrome/keys';

console.log(Trello);
console.log(TRELLO_APP_KEY);

export default class ToggleCardDependenciesView extends Component {
  constructor(props) {
    super(props);
    this.state = { isVisible: false };
  }

  buttonOnClick = () => {
    this.setState({ isVisible: !this.state.isVisible });
  }
  authenticationSuccess = () => {
    console.log('Successful authentication!');
  }
  authenticationFailure = () => {
    console.log('Failed authentication!');
  }
  trelloAuth = () => {
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
    console.log(Trello.authorized());
  }

  render() {
    return (
      <div className={''} onClick={this.trelloAuth}>
        <span className={'board-header-btn-icon icon-sm'} >
        </span>
        <span className={'board-header-btn-text'}>
          View Card Dependencies
        </span>
      </div>
    );
  }
}
