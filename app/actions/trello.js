export const actionTypes = {
  LOGIN_TRELLO: 'LOGIN_TRELLO',
  LOGOUT_TRELLO: 'LOGOUT_TRELLO',
  TRY_AUTH_TRELLO: 'TRY_AUTH_TRELLO',
  GET_LISTS_TRELLO: 'GET_LISTS_TRELLO',
  GET_BOARD_SHORTLINK: 'GET_BOARD_SHORTLINK',
  SET_TODO_LIST: 'SET_TODO_LIST',
  SET_DONE_LIST: 'SET_DONE_LIST',
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
      dispatchByThunk({
        type: actionTypes.TRY_AUTH_TRELLO,
        token: getToken(),
        loggedIn: true,
      });
      successCallback();
    };
    const extendedErrCallback = () => {
      dispatchByThunk({
        type: actionTypes.TRY_AUTH_TRELLO,
        token: getStateTree().trello.token,
        loggedIn: getStateTree().trello.loggedIn,
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
        type: actionTypes.LOGIN_TRELLO,
        token: getToken(),
        loggedIn: true,
      });
      successCallback();
    };
    const extendedErrCallback = () => {
      dispatchByThunk({
        type: actionTypes.TRY_AUTH_TRELLO,
        token: getStateTree().trello.token,
        loggedIn: getStateTree().trello.loggedIn,
      });
      errCallback();
    };

    login(TRELLO_APP_KEY, APP_NAME, extendedSuccessCallback, extendedErrCallback, type);
    dispatchByThunk({
      type: actionTypes.LOGIN_TRELLO,
      token: getStateTree().trello.token,
      loggedIn: getStateTree().trello.loggedIn,
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

export const getListsTrello = (
  boardShortLink, successCallback = () => {}, errCallback = () => {}
) => (
  async (dispatchByThunk) => {
    const extendedSuccessCallback = (result) => {
      dispatchByThunk({
        type: actionTypes.GET_LISTS_TRELLO,
        lists: result,
      });
      successCallback();
    };
    getLists(boardShortLink, extendedSuccessCallback, errCallback);
  }
);

export const setTodoList = (listId) => ({
  type: actionTypes.SET_TODO_LIST,
  todoListId: listId,
});

export const setDoneList = (listId) => ({
  type: actionTypes.SET_DONE_LIST,
  doneListId: listId,
});
