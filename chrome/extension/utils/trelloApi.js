import Trello from './trelloClient';

export const login = (
  key, appName, successCallback, errCallback,
  type = 'popup', expiration = 'never', read = true, write = true
) => {
  Trello.setKey(key);
  Trello.authorize({
    type,
    name: appName,
    scope: { read, write },
    expiration,
    success: successCallback,
    error: errCallback
  });
};

export const logout = () => {
  Trello.deauthorize();
};

export const tryAuth = (successCallback, errCallback) => {
  // Auth with localStorage.trello_token directly if exist.
  Trello.authorize({
    interactive: false,
    success: successCallback,
    error: errCallback
  });
  console.log('trello_token@tryAuth =', Trello.token());
};

export const getToken = () => Trello.token();
