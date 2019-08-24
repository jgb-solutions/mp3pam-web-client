import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'

import search  from './searchReducer';
import playerReducer from './playerReducer';

const playerPersistConfig = {
  key: 'player1',
  storage,
  // blacklist: ['action'],
  stateReconciler: autoMergeLevel2
}
export default combineReducers({
  search,
  player: persistReducer(playerPersistConfig, playerReducer)
});
