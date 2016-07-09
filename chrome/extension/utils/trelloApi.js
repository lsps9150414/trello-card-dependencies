import Trello from './trelloClient';

export const trelloLogin = (
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

export const trelloLogout = () => {
  Trello.deauthorize();
};
