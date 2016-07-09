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

    tryAuth(extendedSuccessCallback, extendedErrCallback);
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

    login(
      TRELLO_APP_KEY, 'Trello Card Dependencies',
      extendedSuccessCallback, errCallback, type
    );
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
