import { actionTypes } from '../actions/options';

import { handleActions } from 'redux-actions';

const initialState = {
  trelloToken: null,
};

export default handleActions(
  {
    [actionTypes.TRY_AUTH_TRELLO]: (state, action) => ({
      ...state,
      ...{ trelloToken: action.trelloToken }
    }),
    [actionTypes.LOGIN_TRELLO]: (state) => state,
    [actionTypes.LOGOUT_TRELLO]: () => initialState,
  }, initialState);
