import {
	PLAY_LIST,
	RESUME_LIST,
	PAUSE_PLAYER,
	SYNC_PLAYER_STATE,
} from "./types";
import { PAUSE, PLAY, RESUME, PAUSE_SOUND, RESUME_SOUND, PLAY_SOUND } from "./actions";
import ListInterface, { SoundInterface } from "../../interfaces/ListInterface";

export const syncState = (updatedState: Object) => ({
	type: SYNC_PLAYER_STATE,
	payload: { updatedState }
});

export const playList = (list: ListInterface) => {
	console.log(list)
	return {
		type: PLAY_LIST,
		payload: { list, action: PLAY }
	};
};

export const pauseList = () => ({
	type: PAUSE_PLAYER,
	payload: { action: PAUSE }
});

export const resumeList = () => ({
	type: RESUME_LIST,
	payload: { action: RESUME }
});

export const pauseSound = () => ({
	type: PAUSE_SOUND,
	payload: { action: PAUSE_SOUND }
});

export const resumeSound = () => ({
	type: RESUME_SOUND,
	payload: { action: RESUME_SOUND }
});

export const playSound = (sound: SoundInterface) => ({
	type: PLAY_SOUND,
	payload: { action: PLAY_SOUND, sound }
});
