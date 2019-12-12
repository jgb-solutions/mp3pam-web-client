import {
	PLAY_LIST,
	RESUME_LIST,
	PAUSE_PLAYER,
	SYNC_PLAYER_STATE,
	RESUME_SOUND,
	PAUSE_SOUND,
	PLAY_SOUND,
	PLAY_NEXT,
	ADD_TO_QUEUE
} from "../actions/player_action_types";
import PlayerInterface from "../../interfaces/PlayerInterface";
import { NONE } from "../../utils/constants";
import { PAUSE } from "redux-persist";

const INITIAL_PLAYER_STATE = {
	volume: 80,
	isPlaying: false,
	repeat: NONE,
	position: 0,
	elapsed: "00.00",
	currentTime: 0,
	duration: "00.00",
	onRepeat: false,
	isShuffled: false,
	updateHack: '',
	action: PAUSE,
	soundList: [],
};

export default function (
	playerState: PlayerInterface = INITIAL_PLAYER_STATE,
	playerAction: { type: string; payload: { updatedState?: object } }
) {
	const { type, payload } = playerAction;
	const time = Date.now().toString()

	switch (type) {
		case SYNC_PLAYER_STATE:
			return { ...playerState, ...payload.updatedState };

		case PLAY_LIST:
			return { ...playerState, ...payload };

		case RESUME_LIST:
			return { ...playerState, ...payload, updateHack: time };

		case PAUSE_PLAYER:
			return { ...playerState, ...payload };

		case PAUSE_SOUND:
			return { ...playerState, ...payload };

		case RESUME_SOUND:
			return { ...playerState, ...payload };

		case PLAY_SOUND:
			console.log(payload);
			return { ...playerState, ...payload, updateHack: time };

		case PLAY_NEXT:
			return { ...playerState, ...payload, updateHack: time };

		case ADD_TO_QUEUE:
			return { ...playerState, ...payload, updateHack: time };

		default:
			return playerState;
	}
}
