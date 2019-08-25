import { SYNC_PLAYER_STATE, PLAY_LIST, PAUSE_PLAYER, RESUME_LIST } from "./types";
import { PAUSE, PLAY, RESUME } from "./actions";
import ListInterface from "../../interfaces/ListInterface";

export const syncState = (updatedState: Object) => ({
	type: SYNC_PLAYER_STATE,
	payload: { updatedState }
});

export const playList = (list: ListInterface) => ({
	// fetch List to play
	type: PLAY_LIST,
	payload: { list, action: PLAY }
});

export const pauseList = () => ({
	type: PAUSE_PLAYER,
	payload: { action: PAUSE }
});

export const resumeList = () => ({
	type: RESUME_LIST,
	payload: { action: RESUME }
});
