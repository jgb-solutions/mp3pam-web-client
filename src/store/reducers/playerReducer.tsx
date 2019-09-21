import {
	PLAY_LIST,
	RESUME_LIST,
	PAUSE_PLAYER,
	SYNC_PLAYER_STATE
} from "../actions/types";
import { PAUSE } from "../actions/actions";
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
	// Should be temporary
	updateHack: '',
	list: {
		id: "2342423",
		items: [],
		image: "https://images.mp3pam.com/demo/artist9.jpg",
		name: "Breakfast",
		author: "jill111",
		type: "album"
	},
	action: PAUSE,
	// currentTrack: {
	// 	id: '42139505',
	// 	hash: 42139505,
	// 	title: "Bad News",
	// 	detail:
	// 		"Cat, 'if you don't explain it is right?' 'In my youth,' Father William replied to his ear. Alice considered a little, and then said 'The fourth.' 'Two days wrong!' sighed the Lory, as soon as she.",
	// 	lyrics:
	// 		"She went in without knocking, and hurried off at once, while all the jurymen are back in a minute or two, they began moving about again, and looking at them with large round eyes, and half believed herself in Wonderland, though she knew that it might tell her something worth hearing. For some minutes it puffed away without speaking, but at the bottom of the court. 'What do you mean \"purpose\"?' said Alice. 'Then you should say what you would seem to come once a week: HE taught us Drawling, Stretching, and Fainting in Coils.' 'What was THAT like?' said Alice. 'Well, I never heard of \"Uglification,\"' Alice ventured to ask. 'Suppose we change the subject,' the March Hare and the Mock Turtle, 'but if they do, why then they're a kind of serpent, that's all I can say.' This was such a puzzled expression that she was now only ten inches high, and her eyes filled with tears again as she could. 'The game's going on between the executioner, the King, 'or I'll have you executed, whether you're a.",
	// 	url: "/api/v1/musics/42139505",
	// 	play_count: 0,
	// 	play_url: "https://audios.mp3pam.com/OMVR-Bad-News.mp3",
	// 	download_count: 0,
	// 	download_url: "/t/42139505",
	// 	image: "https://images.mp3pam.com/demo/artist9.jpg",
	// 	favorite: true,
	// 	category: {
	// 		name: "Konpa",
	// 		slug: "konpa",
	// 		url: "/api/v1/categories/konpa"
	// 	},
	// 	artist: {
	// 		avatar: "https://images.mp3pam.com/demo/logo.jpg",
	// 		bio: null,
	// 		musics: "/api/v1/artists/77868635/musics",
	// 		name: "OMVR",
	// 		stageName: "OMVR",
	// 		url: "/api/v1/artists/77868635",
	// 		verified: false
	// 	}
	// }
};

export default function (
	playerState: PlayerInterface = INITIAL_PLAYER_STATE,
	playerAction: { type: string; payload: { updatedState?: Object } }
) {
	const { type, payload } = playerAction;

	switch (type) {
		case SYNC_PLAYER_STATE:
			// console.log("updating the state with", payload.updatedState);
			return { ...playerState, ...payload.updatedState };
		case PLAY_LIST:
			// console.log("play called", `playerState`, playerState, payload);
			return { ...playerState, ...payload };
		case RESUME_LIST:
			// console.log("resume called", `playerState`, playerState, payload);
			return { ...playerState, ...payload, set: { ...playerState.list }, updateHack: Date.now().toString() };
		case PAUSE_PLAYER:
			// console.log("pause called", `playerState`, playerState, payload);
			return { ...playerState, ...payload };
		default:
			return playerState;
	}
}
