export const LOGIN_TRELLO = 'LOGIN_TRELLO';
export const LOGOUT_TRELLO = 'LOGOUT_TRELLO';
import { trelloLogin, trelloLogout } from '../../chrome/extension/utils/trelloApi';
import { TRELLO_APP_KEY } from '../../chrome/keys';

export const loginTrello = (successCallback, errCallback, type) => {
  trelloLogin(
    TRELLO_APP_KEY, 'Trello Card Dependencies',
    successCallback, errCallback, type
  );
};
