import { SAVE_SEARCH } from "./search_action_types"
import SearchInterface from "../../interfaces/SearchInterface"

export const save = (result: SearchInterface) => {
	return {
		type: SAVE_SEARCH,
		payload: result
	}
}
