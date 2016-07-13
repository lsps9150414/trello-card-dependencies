export const actionTypes = {
  LOGIN_TRELLO: 'LOGIN_TRELLO',
  LOGOUT_TRELLO: 'LOGOUT_TRELLO',
  TRY_AUTH_TRELLO: 'TRY_AUTH_TRELLO',
  GET_LISTS_TRELLO: 'GET_LISTS_TRELLO',
  GET_BOARD_SHORTLINK: 'GET_BOARD_SHORTLINK',
};

import { TRELLO_APP_KEY, APP_NAME } from '../constants';
import {
  login,
  logout,
  tryAuth,
  getToken,
  getLists,
} from '../utils/trello/trelloApi';

export const tryAuthTrello = (successCallback = () => {}, errCallback = () => {}) => (
  async (dispatchByThunk, getStateTree) => {
    const extendedSuccessCallback = () => {
      successCallback();
      dispatchByThunk({
        type: actionTypes.TRY_AUTH_TRELLO,
        token: getToken(),
        status: 'LOGGED_IN',
      });
    };
    const extendedErrCallback = () => {
      errCallback();
      dispatchByThunk({
        type: actionTypes.TRY_AUTH_TRELLO,
        token: getStateTree().trello.token,
        status: getStateTree().trello.status,
      });
    };

    tryAuth(TRELLO_APP_KEY, APP_NAME, extendedSuccessCallback, extendedErrCallback);
  }
);

export const loginTrello = (successCallback = () => {}, errCallback = () => {}, type) => (
  async (dispatchByThunk, getStateTree) => {
    const extendedSuccessCallback = () => {
      successCallback();
      dispatchByThunk({
        type: actionTypes.LOGIN_TRELLO,
        token: getToken(),
        status: 'LOGGED_IN',
      });
    };

    login(TRELLO_APP_KEY, APP_NAME, extendedSuccessCallback, errCallback, type);
    dispatchByThunk({
      type: actionTypes.LOGIN_TRELLO,
      token: getStateTree().trello.token,
      status: 'LOGGINING',
    });
  }
);

export const logoutTrello = () => {
  logout();
  return {
    type: actionTypes.LOGOUT_TRELLO,
  };
};

export const getBoardShortLink = () => document.location.href.split('/')[4];

export const getListsTrello = (boardShortLink) => {
  getLists(boardShortLink);
};
