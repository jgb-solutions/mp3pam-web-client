import { createStore } from 'redux';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'

import reducers from './reducers';

const persistConfig = {
  key: 'version-0',
  storage,
  whitelist: ['player', 'search'],
  stateReconciler: autoMergeLevel2
};

const persistedReducer = persistReducer(persistConfig, reducers);

export default () => {
  let store = createStore(persistedReducer);
  let persistor = persistStore(store);
  return { store, persistor };
};
