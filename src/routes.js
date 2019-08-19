const Routes = {
  root: '/',
  search: '/search',
  about: '/about',
  queue: '/queue',
  upload: '/upload',
  set: '/set/:id',
  goToSetDetail: setID => `/set/${setID}`
};

export default Routes;
