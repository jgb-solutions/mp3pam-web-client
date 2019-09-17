const Routes = {
	home: `/`,
	browse: `/browse`,
	search: `/search`,
	about: `/about`,
	queue: `/queue`,
	upload: `/upload`,
	users: `/users`,
	list: `/list/:listId`,
	favorites: `/favorites`,
	favoriteAlbums: `/favorite/albums`,
	favoriteArtists: `/favorite/artists`,
	favoritePodcasts: `/favorite/podcats`,
	favoriteShows: `/favorite/shows`,
	goToListDetail: (listId: string) => `/list/${listId}`,
	goToAuthorDetail: (authorID: string) => `/author/${authorID}`
};

export default Routes;
