import { actionTypes } from '../actions/trello';

import { handleActions } from 'redux-actions';

export const initialState = {
  lists: [],
  cards: [],
  todoListId: '',
  doneListId: '',
};

export default handleActions({
  [actionTypes.GET_LISTS]: (state, action) => ({
    ...state,
    ...{ lists: action.lists }
  }),
  [actionTypes.GET_CARDS_OF_BOARD]: (state, action) => ({
    ...state,
    ...{ cards: action.cards }
  }),
  [actionTypes.SET_TODO_LIST]: (state, action) => ({
    ...state,
    ...{ todoListId: action.todoListId }
  }),
  [actionTypes.SET_DONE_LIST]: (state, action) => ({
    ...state,
    ...{ doneListId: action.doneListId }
  }),
}, initialState);
