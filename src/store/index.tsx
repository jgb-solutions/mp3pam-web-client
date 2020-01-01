import { createStore } from "redux"
import storage from "redux-persist/lib/storage"
import { persistStore, persistReducer } from "redux-persist"
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2"

import reducers from "./reducers"

const persistConfig = {
	key: `v_01_01_2020`,
	storage,
	whitelist: ["player", "search", "currentUser"],
	stateReconciler: autoMergeLevel2
}

const persistedReducer = persistReducer(persistConfig, reducers)

export default () => {
	let store = createStore(persistedReducer)
	let persistor = persistStore(store)
	return { store, persistor }
}
