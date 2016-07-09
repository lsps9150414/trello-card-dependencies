export const actionTypes = {
  LOGIN_TRELLO: 'LOGIN_TRELLO',
  LOGOUT_TRELLO: 'LOGOUT_TRELLO',
  TRY_AUTH_TRELLO: 'TRY_AUTH_TRELLO',
};

import {
  login,
  logout,
  tryAuth,
  getToken,
} from '../../chrome/extension/utils/trelloApi';
import { TRELLO_APP_KEY } from '../../chrome/keys';

export const tryAuthTrello = (successCallback, errCallback) => {
  tryAuth(successCallback, errCallback);
  chrome.storage.sync.set(
    { trello_token: getToken() },
    () => { console.log('save trello_token to chrome storage'); }
  );
  return {
    type: actionTypes.TRY_AUTH_TRELLO,
    trelloToken: getToken(),
  };
};

export const loginTrello = (successCallback, errCallback, type) => {
  login(
    TRELLO_APP_KEY, 'Trello Card Dependencies',
    successCallback, errCallback, type
  );
  return {
    type: actionTypes.LOGIN_TRELLO,
  };
};

export const logoutTrello = () => {
  logout();
  chrome.storage.sync.remove(
    'trello_token',
    () => { console.log('trello_token removed from chrome storage'); }
  );
  return {
    type: actionTypes.LOGOUT_TRELLO,
  };
};
