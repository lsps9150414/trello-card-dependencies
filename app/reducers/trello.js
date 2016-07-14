import { actionTypes } from '../actions/trello';

import { handleActions } from 'redux-actions';

export const initialState = {
  token: null,
  loggedIn: false,
  lists: [],
};

export default handleActions({
  [actionTypes.TRY_AUTH_TRELLO]: (state, action) => ({
    ...state,
    ...{ token: action.token, loggedIn: action.loggedIn }
  }),
  [actionTypes.LOGIN_TRELLO]: (state, action) => ({
    ...state,
    ...{ token: action.token, loggedIn: action.loggedIn }
  }),
  [actionTypes.LOGOUT_TRELLO]: () => initialState,
  [actionTypes.GET_LISTS_TRELLO]: (state, action) => ({
    ...state,
    ...{ lists: action.lists }
  }),
}, initialState);
