import { combineReducers } from 'redux';
import trello from './trello';
import trelloCredentials from './trelloCredentials';
import system from './system';

export default combineReducers({
  trelloCredentials,
  trello,
  system,
});
