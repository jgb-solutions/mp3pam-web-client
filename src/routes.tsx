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
		edit: `/manage-album/:hash`,
		detailPage: (hash: string) => `/album/${hash}`,
		editPage: (hash: string) => `/manage-album/${hash}`,
	},
	artist: {
		show: `/artist/:hash`,
		detailPage: (hash: string) => `/artist/${hash}`,
		editPage: (hash: string) => `/manage-artists/${hash}`,
	},
	track: {
		show: `/track/:hash`,
		detailPage: (hash: string) => `/track/${hash}`,
		editPage: (hash: string) => `/manage-tracks/${hash}`,
	},
	episode: {
		show: `/episode/:hash`,
		detailPage: (hash: string) => `/episode/${hash}`,
	},
	genre: {
		show: `/browse-:slug-tracks`,
		detailPage: (slug: string) => `/browse-${slug}-tracks`,
	},
	podcast: {
		show: `/podcast/:hash`,
		detailPage: (hash: string) => `/podcast/${hash}`,
		goToAuthorDetail: (authorID: string) => `/author/${authorID}`,
		editPage: (hash: string) => `/manage-podcasts/${hash}`,
	},
	playlist: {
		show: `/playlist/:hash`,
		edit: `/manage-playlists/:hash`,
		detailPage: (hash: string) => `/playlist/${hash}`,
		goToAuthorDetail: (authorID: string) => `/author/${authorID}`,
		editPage: (hash: string) => `/manage-playlists/${hash}`,
	},
	download: {
		audio: `/download/:type/:hash`,
		podcastPage: (hash: string) => `/download/podcast/${hash}`,
		trackPage: (hash: string) => `/download/track/${hash}`,
	},
	user: {
		detailPage: (userHash: string) => `/user/${userHash}`,
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
		detailPage: (userHash: string) => `/user/${userHash}`,
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
}

export default Routes
