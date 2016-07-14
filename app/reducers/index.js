import { combineReducers } from 'redux';
import trello from './trello';
import system from './system';

export default combineReducers({
  trello,
  system,
});
