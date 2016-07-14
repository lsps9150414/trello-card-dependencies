import { actionTypes } from '../actions/system';

import { handleActions } from 'redux-actions';

export const initialState = {
  showCardDepView: false,
};

export default handleActions({
  [actionTypes.TOGGLE_CARD_DEP_VIEW]: (state, action) => ({
    ...state,
    ...{ showCardDepView: action.showCardDepView }
  }),
}, initialState);
