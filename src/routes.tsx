const Routes = {
	home: `/`,
	browse: `/browse`,
	search: `/search`,
	about: `/about`,
	queue: `/queue`,
	upload: `/upload`,
	set: `/set/:id`,
	goToSetDetail: (setID: string) => `/set/${setID}`,
	goToAuthorDetail: (authorID: string) => `/author/${authorID}`
};

export default Routes;
