import TrackInterface from "./interfaces/TrackInterface";
import { UserData } from "./interfaces/UserInterface";

const Routes = {
	pages: {
		home: `/`,
		browse: `/browse`,
		search: `/search`,
		about: `/about`,
		upload: `/upload`,
		users: `/users`,
		login: `/login`,
		library: `/library`,
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
		tracks: `/library/tracks`,
		albums: `/library/albums`,
		artists: `/library/artists`,
		podcasts: `/library/podcats`,
		shows: `/library/shows`,
		queue: `/library/queue`,

	},
	browse: {
		detailPage: (user: UserData) => `/user/${user.id}`,
		users: `/users`,
		tracks: `/browse/tracks`,
		albums: `/browse/albums`,
		artists: `/browse/artists`,
		podcasts: `/browse/podcasts`,
		shows: `/browse/shows`,
	},
	auth: {
		facebook: `/auth/facebook`
	}
	// liked: {
	// 	likedTracks: `liked/tracks`,
	// 	likedAlbums: `/liked/albums`,
	// 	likedArtists: `/liked/artists`,
	// 	likedPodcasts: `/liked/podcats`,
	// 	likedShows: `/liked/shows`,
	// },
};

export default Routes;
