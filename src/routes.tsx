const Routes = {
	home: `/`,
	browse: `/browse`,
	search: `/search`,
	about: `/about`,
	queue: `/queue`,
	upload: `/upload`,
	list: `/list/:listId`,
	goToListDetail: (setID: string) => `/list/${setID}`,
	goToAuthorDetail: (authorID: string) => `/author/${authorID}`
};

export default Routes;
