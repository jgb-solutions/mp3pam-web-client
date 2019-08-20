const Routes = {
  home: '/',
  browse: '/browse',
  search: '/search',
  about: '/about',
  queue: '/queue',
  upload: '/upload',
  set: '/set/:id',
  goToSetDetail: setID => `/set/${setID}`,
  goToAuthorDetail: authorID => `/author/${authorID}`
};

export default Routes;
