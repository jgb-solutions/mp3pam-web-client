import {
	PLAY_LIST,
	RESUME_LIST,
	PAUSE_PLAYER,
	SYNC_PLAYER_STATE
} from "../actions/types";
import { PAUSE, PAUSE_SOUND, RESUME_SOUND, PLAY_SOUND } from "../actions/actions";
import PlayerInterface from "../../interfaces/PlayerInterface";
import { NONE } from "../../utils/constants";

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
};

export default function (
	playerState: PlayerInterface = INITIAL_PLAYER_STATE,
	playerAction: { type: string; payload: { updatedState?: object } }
) {
	const { type, payload } = playerAction;
	const time = Date.now().toString()

	switch (type) {
		case SYNC_PLAYER_STATE:
			console.log("updating the state with", payload.updatedState);
			return { ...playerState, ...payload.updatedState };
		case PLAY_LIST:
			console.log("play called", `playerState`, playerState, payload);
			return { ...playerState, ...payload };
		case RESUME_LIST:
			console.log("resume called", `playerState`, playerState, payload);
			return { ...playerState, ...payload, updateHack: time };
		case PAUSE_PLAYER:
			console.log("pause called", `playerState`, playerState, payload);
			return { ...playerState, ...payload };
		case PAUSE_SOUND:
			console.log("pause called", `playerState`, playerState, payload);
			return { ...playerState, ...payload };
		case RESUME_SOUND:
			console.log("pause called", `playerState`, playerState, payload);
			return { ...playerState, ...payload };
		case PLAY_SOUND:
			console.log("play sound called", `playerState`, playerState, payload);
			return { ...playerState, ...payload, updateHack: time };
		default:
			return playerState;
	}
}
