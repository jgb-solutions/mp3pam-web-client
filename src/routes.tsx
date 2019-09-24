import TrackInterface from "./interfaces/TrackInterface";
import { UserData } from "./interfaces/UserInterface";

const Routes = {
	pages: {
		home: `/`,
		browse: `/browse`,
		search: `/search`,
		about: `/about`,
		queue: `/queue`,
		upload: `/upload`,
		users: `/users`,
		login: `/login`,
	},
	album: {
		show: `/album/:hash`,
		detailPage: (album: any) => `/album/${album.id}`,
	},
	artist: {
		show: `/artist/:hash`,
		detailPage: (artist: any) => `/artist/${artist.id}`,
	},
	track: {
		show: `/track/:hash`,
		detailPage: (track: TrackInterface) => `/track/${track.id}`,
	},
	podcast: {
		show: `/podcast/:hash`,
		detailPage: (podcast: any) => `/podcast/${podcast.id}`,
		goToAuthorDetail: (authorID: string) => `/author/${authorID}`
	},
	user: {
		detailPage: (user: UserData) => `/user/${user.id}`,
		users: `/users`,
		favorites: `/favorites`,
		favoriteAlbums: `/favorite/albums`,
		favoriteArtists: `/favorite/artists`,
		favoritePodcasts: `/favorite/podcats`,
		favoriteShows: `/favorite/shows`,
	},
};

export default Routes;
