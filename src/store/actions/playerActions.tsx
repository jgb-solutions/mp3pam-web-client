import ListInterface, { SoundInterface } from "../../interfaces/ListInterface"
import {
	SYNC_PLAYER_STATE,
	PLAY_LIST, PLAY,
	PAUSE_PLAYER,
	PAUSE, RESUME_LIST,
	RESUME, PAUSE_SOUND,
	RESUME_SOUND, PLAY_NEXT,
	ADD_TO_QUEUE,
	PLAY_SOUND
} from "./player_action_types"

export const syncState = (updatedState: Object) => ({
	type: SYNC_PLAYER_STATE,
	payload: { updatedState }
})

export const playList = (list: ListInterface, sound?: SoundInterface) => {
	return {
		type: PLAY_LIST,
		payload: { list, sound, action: PLAY }
	}
}

export const pauseList = () => ({
	type: PAUSE_PLAYER,
	payload: { action: PAUSE }
})

export const resumeList = () => ({
	type: RESUME_LIST,
	payload: { action: RESUME }
})
export const playSound = (sound: SoundInterface) => ({
	type: PLAY_SOUND,
	payload: { action: PLAY_SOUND, sound }
})

export const pauseSound = () => ({
	type: PAUSE_SOUND,
	payload: { action: PAUSE_SOUND }
})

export const resumeSound = () => ({
	type: RESUME_SOUND,
	payload: { action: RESUME_SOUND }
})

export const playNext = (soundList: SoundInterface[]) => ({
	type: PLAY_NEXT,
	payload: { action: PLAY_NEXT, soundList }
})

export const addToQueue = (soundList: SoundInterface[]) => ({
	type: ADD_TO_QUEUE,
	payload: { action: ADD_TO_QUEUE, soundList }
})
