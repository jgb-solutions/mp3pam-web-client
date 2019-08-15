import { combineReducers } from 'redux';

import searchReducer from './searchReducer';
import playerReducer from './playerReducer';

export default combineReducers({
  searchReducer,
  playerReducer
});
