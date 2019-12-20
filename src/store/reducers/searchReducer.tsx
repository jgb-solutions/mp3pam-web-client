import { SAVE_SEARCH, SEARCH } from "../actions/search_action_types"
import SearchInterface from "../../interfaces/SearchInterface"
const location: any = document.location

const INITIAL_STATE: SearchInterface = {
	term: new URL(location).searchParams.get("query") || "",
	data: {
		tracks: [],
		artists: [],
		albums: []
	}
}

export default function (
	state = INITIAL_STATE,
	searchAction: { type: string; payload: SearchInterface }
) {
	switch (searchAction.type) {
		case SAVE_SEARCH:
			return searchAction.payload
		case SEARCH:
			return { ...state, term: searchAction.payload.term }
		default:
			return state
	}
}
