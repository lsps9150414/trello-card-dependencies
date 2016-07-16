export const actionTypes = {
  GET_LISTS: 'GET_LISTS',
  GET_CARDS_OF_LIST: 'GET_CARDS_OF_LIST',
  GET_CARDS_OF_BOARD: 'GET_CARDS_OF_BOARD',
  GET_BOARD_SHORTLINK: 'GET_BOARD_SHORTLINK',
  SET_TODO_LIST: 'SET_TODO_LIST',
  SET_DONE_LIST: 'SET_DONE_LIST',
};

import {
  getLists,
  getCardsOfList,
  getCardsOfBoard,
} from '../utils/trello/trelloApi';

export const getBoardShortLink = () => document.location.href.split('/')[4];

export const getListsTrello = (
  boardShortLink, successCallback = () => {}, errCallback = () => {}
) => (
  async (dispatchByThunk) => {
    const extendedSuccessCallback = (result) => {
      console.log('action: getListsTrello');
      dispatchByThunk({
        type: actionTypes.GET_LISTS,
        lists: result,
      });
      successCallback();
    };
    getLists(boardShortLink, extendedSuccessCallback, errCallback);
  }
);

export const getCardsOfListTrello = (
  listId, successCallback = () => {}, errCallback = () => {}
) => (
  async (dispatchByThunk) => {
    const extendedSuccessCallback = (result) => {
      dispatchByThunk({
        type: actionTypes.GET_CARDS_OF_LIST,
        cards: result,
      });
      successCallback();
    };
    getCardsOfList(listId, extendedSuccessCallback, errCallback);
  }
);

export const getCardsOfBoardTrello = (
  boardShortLink, successCallback = () => {}, errCallback = () => {}
) => (
  async (dispatchByThunk) => {
    const extendedSuccessCallback = (result) => {
      console.log('cards:', result);
      dispatchByThunk({
        type: actionTypes.GET_CARDS_OF_BOARD,
        cards: result,
      });
      successCallback();
    };
    getCardsOfBoard(boardShortLink, extendedSuccessCallback, errCallback);
  }
);

export const setTodoList = (listId) => ({
  type: actionTypes.SET_TODO_LIST,
  todoListId: listId,
});

export const setDoneList = (listId) => ({
  type: actionTypes.SET_DONE_LIST,
  doneListId: listId,
});
