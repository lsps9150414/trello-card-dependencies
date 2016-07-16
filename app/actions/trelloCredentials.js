export const actionTypes = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  TRY_AUTH: 'TRY_AUTH',
};

import { TRELLO_APP_KEY, APP_NAME } from '../constants';
import {
  login,
  logout,
  tryAuth,
  getToken,
} from '../utils/trello/trelloApi';

export const tryAuthTrello = (successCallback = () => {}, errCallback = () => {}) => (
  async (dispatchByThunk, getStateTree) => {
    console.log('action: tryAuthTrello');
    const extendedSuccessCallback = () => {
      dispatchByThunk({
        type: actionTypes.TRY_AUTH,
        token: getToken(),
        loggedIn: true,
      });
      successCallback();
    };
    const extendedErrCallback = () => {
      dispatchByThunk({
        type: actionTypes.TRY_AUTH,
        token: getStateTree().trelloCredentials.token,
        loggedIn: getStateTree().trelloCredentials.loggedIn,
      });
      errCallback();
    };

    tryAuth(TRELLO_APP_KEY, APP_NAME, extendedSuccessCallback, extendedErrCallback);
  }
);

export const loginTrello = (successCallback = () => {}, errCallback = () => {}, type) => (
  async (dispatchByThunk, getStateTree) => {
    const extendedSuccessCallback = () => {
      dispatchByThunk({
        type: actionTypes.LOGIN,
        token: getToken(),
        loggedIn: true,
      });
      successCallback();
    };
    const extendedErrCallback = () => {
      dispatchByThunk({
        type: actionTypes.TRY_AUTH,
        token: getStateTree().trelloCredentials.token,
        loggedIn: getStateTree().trelloCredentials.loggedIn,
      });
      errCallback();
    };

    login(TRELLO_APP_KEY, APP_NAME, extendedSuccessCallback, extendedErrCallback, type);
    dispatchByThunk({
      type: actionTypes.LOGIN,
      token: getStateTree().trelloCredentials.token,
      loggedIn: getStateTree().trelloCredentials.loggedIn,
    });
  }
);

export const logoutTrello = () => {
  logout();
  return {
    type: actionTypes.LOGOUT,
  };
};
