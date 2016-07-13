import Trello from './trelloClient';

export const tryAuth = (
  key, appName, successCallback, errCallback, read = true, write = true
) => {
  // Auth with localStorage.trello_token directly if exist.
  Trello.setKey(key);
  Trello.authorize({
    interactive: false,
    name: appName,
    scope: { read, write },
    success: successCallback,
    error: errCallback
  });
};

export const login = (
  key, appName, successCallback, errCallback,
  type = 'popup', expiration = 'never', read = true, write = true
) => {
  Trello.setKey(key);
  Trello.authorize({
    type,
    expiration,
    name: appName,
    scope: { read, write },
    success: successCallback,
    error: errCallback
  });
};

export const logout = () => {
  Trello.deauthorize();
};

export const getToken = () => Trello.token();

export const getLists = (boardShortLink, successCallback, errCallback) => {
  Trello.get(`/boards/${boardShortLink}/lists`, successCallback, errCallback);
};
