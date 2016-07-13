import { actionTypes } from '../actions/trello';

import { handleActions } from 'redux-actions';

const initialState = {
  token: null,
  status: 'LOGGED_OUT',
  lists: [],
};

export default handleActions(
  {
    [actionTypes.TRY_AUTH_TRELLO]: (state, action) => ({
      ...state,
      ...{ token: action.token, status: action.status }
    }),
    [actionTypes.LOGIN_TRELLO]: (state, action) => ({
      ...state,
      ...{ token: action.token, status: action.status }
    }),
    [actionTypes.LOGOUT_TRELLO]: () => initialState,
    [actionTypes.GET_LISTS_TRELLO]: (state, action) => ({
      ...state,
      ...{ lists: action.lists }
    }),
  }, initialState);
