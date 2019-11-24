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
		library: `/favorites`,
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
		account: `/account`,
		library: {
			tracks: `/your-tracks`,
			albums: `/your-albums`,
			artists: `/your-artists`,
			podcasts: `/your-podcasts`,
			playlists: `/your-playlists`,
			shows: `/your-shows`,
			queue: `/your-queue`,
		},
		manage: {
			home: `/manage`,
			tracks: `/manage-tracks`,
			albums: `/manage-albums`,
			artists: `/manage-artists`,
			podcasts: `/manage-podcasts`,
			playlists: `/manage-playlists`,
			shows: `/manage-shows`,
		},
		create: {
			track: `/add-track`,
			album: `/create-album`,
			artist: `/add-artist`,
			podcast: `/add-podcast`,
			playlist: `/create-playlist`,
			shows: `/add-show`,
		},
	},
	browse: {
		detailPage: (user: UserData) => `/user/${user.id}`,
		users: `/users`,
		tracks: `/browse-tracks`,
		albums: `/browse-albums`,
		artists: `/browse-artists`,
		podcasts: `/browse-podcasts`,
		playlists: `/browse-playlists`,
		shows: `/browse-shows`,
	},
	auth: {
		facebook: `/login-facebook`
	},
	links: {
		jgbSolutions: 'https://jgb.solutions'
	}
};

export default Routes;
