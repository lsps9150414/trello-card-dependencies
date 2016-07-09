import React, { Component } from 'react';

import Trello from '../../chrome/extension/utils/trelloClient';
import { TRELLO_APP_KEY } from '../../chrome/keys';

export default class ToggleCardDependenciesView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      trello_token: null,
    };
  }
  componentWillMount() {
    // Trello.deauthorize();

    console.log('token from chrome storage:');
    this.syncLocalWithChromeStorages(['trello_token'], () => {
      // Auth with localStorage.trello_token directly if exist.
      console.log('atemp to auth');
      Trello.authorize({
        interactive: false,
        success: this.authenticationSuccess
      });
    });
  }
  syncLocalWithChromeStorages = (keysToValue, callback = () => {}) => {
    chrome.storage.sync.get(keysToValue, (items) => {
      console.log('items:', items);
      for (let i = 0; i < Object.keys(items).length; i++) {
        localStorage.setItem(Object.keys(items)[i], items[Object.keys(items)[i]]);
        console.log('localStorage:', localStorage);
        callback();
      }
    });
  }
  buttonOnClick = () => {
    this.setState({ isVisible: !this.state.isVisible });
  }
  authenticationSuccess = () => {
    console.log('Successful authentication!');
    // console.log('token:', Trello.token());
    // console.log(chrome);
    // console.log('localStorage:', localStorage);
    // console.log('localStorage:', localStorage.trello_token);
  }
  authenticationFailure = () => {
    console.log('Failed authentication!');
  }
  trelloAuth = () => {
    Trello.setKey(TRELLO_APP_KEY);
    Trello.authorize({
      type: 'popup',
      name: 'Trello Card Dependencies',
      scope: {
        read: true,
        write: true
      },
      expiration: 'never',
      success: this.authenticationSuccess,
      error: this.authenticationFailure
    });
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
