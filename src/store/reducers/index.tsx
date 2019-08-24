import { combineReducers } from "redux";

import search from "./searchReducer";
import player from "./playerReducer";

export default combineReducers({
	search,
	player
});
