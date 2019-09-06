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
	const listWithItems = { ...list,
		items: [
			{
				id: '421495238',
				title: "Mirrors",
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
					name: "Da'Ville",
					stageName: "Da'Ville",
					url: "/api/v1/artists/77868635",
					verified: false
				}
			},
			{
				id: '421495sdf38',
				title: "Alway On My Mind",
				detail: "Some new detailr",
				lyrics: " minute or two, they began ether you're a.",
				url: "/api/v1/musics/42139505",
				play_count: 0,
				play_url: "https://a.tumblr.com/tumblr_l6l329X69I1qa5l4oo1.mp3",
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
					name: "Da'Ville",
					stageName: "Da'Ville",
					url: "/api/v1/artists/77868635",
					verified: false
				}
			},
			{
				id: '4214asd5238',
				title: "It Girl",
				detail: "Some new detailr",
				lyrics: " minute or two, they began ether you're a.",
				url: "/api/v1/musics/42139505",
				play_count: 0,
				play_url: "http://9092.ultratv100.com:9090/music/1.-Top100/Jason%20Derulo%20-%20It%20Girl.mp3",
				download_count: 0,
				download_url: "/t/42139505",
				image: "https://images-na.ssl-images-amazon.com/images/I/71v6WN02N1L.png",
				favorite: true,
				category: {
					name: "Konpa",
					slug: "konpa",
					url: "/api/v1/categories/konpa"
				},
				artist: {
					avatar: "https://images-na.ssl-images-amazon.com/images/I/71v6WN02N1L.png",
					bio: null,
					musics: "/api/v1/artists/77868635/musics",
					name: "Jason Derulo",
					stageName: "Jason Derulo",
					url: "/api/v1/artists/77868635",
					verified: false
				}
			},
			{
				id: '421s3sd5238',
				title: "Stereo Hearts",
				detail: "Some new detailr",
				lyrics: " minute or two, they began ether you're a.",
				url: "/api/v1/musics/42139505",
				play_count: 0,
				play_url: "http://9092.ultratv100.com:9090/music/1.-Top100/Gym%20Class%20Heroes%20ft.%20Adam%20Levine%20-%20Stereo%20Hearts.mp3",
				download_count: 0,
				download_url: "/t/42139505",
				image: "https://i1.sndcdn.com/artworks-000157680374-y69r9w-t500x500.jpg",
				favorite: true,
				category: {
					name: "Konpa",
					slug: "konpa",
					url: "/api/v1/categories/konpa"
				},
				artist: {
					avatar: "https://i1.sndcdn.com/artworks-000157680374-y69r9w-t500x500.jpg",
					bio: null,
					musics: "/api/v1/artists/77868635/musics",
					name: "Adam Levine",
					stageName: "Adam Levine",
					url: "/api/v1/artists/77868635",
					verified: false
				}
			},
		]
	}
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
