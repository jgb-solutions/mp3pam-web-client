import {
	PLAY_LIST,
	RESUME_LIST,
	PAUSE_PLAYER,
	SYNC_PLAYER_STATE,
} from "./types";
import { PAUSE, PLAY, RESUME } from "./actions";
import ListInterface from "../../interfaces/ListInterface";

export const syncState = (updatedState: Object) => ({
	type: SYNC_PLAYER_STATE,
	payload: { updatedState }
});

export const playList = (list: ListInterface) => {
	// fetch List to play from the network
	const listWithItems = { ...list, items: [
		{
			title: "Good News",
			detail: "Some new detailr",
			lyrics: " minute or two, they began ether you're a.",
			url: "/api/v1/musics/42139505",
			play_count: 0,
			play_url: "https://cs1.mp3.pm/listen/4374092/WWs1cDhWMVJlRXNlVzdmOVZNc1lzWTRiWDRDSTFQSGNRd3FHV0pOQzY3REJBWFZHa0NiQThBdEFuc2lDMXZjRlpIYzRuTUlVdkpFVUZrZDFybjAyTmxZUFFTWjVWc3hiTThxdTVZakdaWnBhOTFsdWQzVU1rK1BWcWRpZjZZUTg/Daville_-_Mirrors_(mp3.pm).mp3",
			download_count: 0,
			download_url: "/t/42139505",
			image: "https://www.reggaeville.com/fileadmin/user_upload/daville.jpg",
			favorite: true,
			category: {
				name: "Konpa",
				slug: "konpa",
				url: "/api/v1/categories/konpa"
			},
			artist: {
				avatar: "https://images.mp3pam.com/demo/logo.jpg",
				bio: null,
				musics: "/api/v1/artists/77868635/musics",
				name: "New Artist",
				stageName: "New Artist",
				url: "/api/v1/artists/77868635",
				verified: false
			}
		}
	] }
	return {
		type: PLAY_LIST,
		payload: { list: listWithItems, action: PLAY }
	}
};

export const pauseList = () => ({
	type: PAUSE_PLAYER,
	payload: { action: PAUSE }
});

export const resumeList = () => ({
	type: RESUME_LIST,
	payload: { action: RESUME }
});
