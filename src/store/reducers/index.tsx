import { combineReducers } from "redux";

import search from "./searchReducer";
import player from "./playerReducer";
import user from "./userReducer";

export default combineReducers({
	search,
	player,
	user
});
