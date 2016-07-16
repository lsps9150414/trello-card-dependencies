import { actionTypes } from '../actions/trelloCredentials';

import { handleActions } from 'redux-actions';

export const initialState = {
  token: null,
  loggedIn: false,
};

export default handleActions({
  [actionTypes.TRY_AUTH]: (state, action) => ({
    ...state,
    ...{ token: action.token, loggedIn: action.loggedIn }
  }),
  [actionTypes.LOGIN]: (state, action) => ({
    ...state,
    ...{ token: action.token, loggedIn: action.loggedIn }
  }),
  [actionTypes.LOGOUT]: () => initialState,
}, initialState);
