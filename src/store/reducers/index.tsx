import { combineReducers } from "redux"

import search from "./searchReducer"
import player from "./playerReducer"
import currentUser from "./userReducer"

export default combineReducers({
	search,
	player,
	currentUser
})
