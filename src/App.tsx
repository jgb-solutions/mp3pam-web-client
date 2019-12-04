import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { ApolloProvider } from '@apollo/react-hooks';
import { get } from 'lodash-es';

// Show Screens
import TrackDetailScreen from './screens/TrackDetailScreen';
// Main screens
import HomeScreen from './screens/HomeScreen';
import UsersScreen from './screens/UsersScreen';
import QueueScreen from './screens/library/QueueScreen';
import AboutScreen from './screens/AboutScreen';
import AddTrackScreen from './screens/manage/AddTrackScreen';
import SearchScreen from './screens/SearchScreen';
import FourOFourScreen from './screens/FourOFourScreen';
import Main from './components/layouts/Main';
// Library/Favorites Screens
import LibraryScreen from './screens/library/LibraryScreen';
import YourTracksScreen from './screens/library/YourTracksScreen';
import YourAlbumsScreen from './screens/library/YourAlbumsScreen';
import YourArtistsScreen from './screens/library/YourArtistsScreen';
import YourPodcastsScreen from './screens/library/YourPodcastsScreen';
// Browse screens
import BrowseScreen from './screens/browse/BrowseScreen';
import BrowseTracksScreen from './screens/browse/BrowseTracksScreen';
import BrowseAlbumsScreen from './screens/browse/BrowseAlbumsScreen';
import BrowseArtistsScreen from './screens/browse/BrowseArtistsScreen';
import BrowsePodcastsScreen from './screens/browse/BrowsePodcastsScreen';
import BrowsePlaylistsScreen from './screens/browse/BrowsePlaylistsScreen';


// Manage Screens
import ManageScreen from './screens/manage/ManageScreen';
// import AddPodcastScreen from './screens/manage/AddPodcastScreen';
import CreateAlbumScreen from './screens/manage/CreateAlbumScreen';
import AddArtistScreen from './screens/manage/AddArtistScreen';
// import CreatePlaylistScreen from './screens/manage/CreatePlaylistScreen';
import YourPlaylistsScreen from './screens/library/YourPlaylistsScreen';
// Auth screens
import FacebookAuth from './screens/auth/FacebookAuth';

// Account Screens
import AccountScreen from './screens/user/AccountScreen';
import LoginScreen from './screens/auth/LoginScreen';

//  Routers
import Routes from './routes';

// Redux Store
import persistedStore from './store';

// Global Style
import './App.css';
import './styles/react-transitions.css';

import { LOG_OUT } from './store/actions/types';
import Plain from './components/layouts/Plain';
import Root from './components/layouts/Root';

const { store, persistor } = persistedStore();

export const API_URL = process.env.NODE_ENV === 'development'
  ? `http://api.mp3pam.loc/graphql`
  : `https://api.mp3pam.com/graphql`;

// Apollo Client
const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.forEach(({ message, extensions: { statusCode } }: any) => {
          if (statusCode === 401 && !window.location.pathname.startsWith('/login')) {
            client.clearStore();
            store.dispatch({ type: LOG_OUT });
          }
        });
      }

      if (networkError) {
        console.log('network errors', networkError)
        // client.mutate({
        //   mutation: notificationAddMutation,
        //   variables: {
        //     text: 'There was a network problem. Please check your connection',
        //   },
        // });
      }
    }),
    // auth link
    setContext((_, { headers }) => {
      // get the authentication token from local storage if it exists
      const token: string | null = get(store.getState(), `currentUser.token`)
      // return the headers to the context so httpLink can read them
      return {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : ``,
        }
      }
    }),
    // http link
    createHttpLink({
      uri: API_URL,
    })
  ]),
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router>
            <Root>
              <Switch>
                <Route path={Routes.pages.home} exact>
                  <Main>
                    <HomeScreen />
                  </Main>
                </Route>
                <Route path={Routes.pages.browse} exact>
                  <Main>
                    <BrowseScreen />
                  </Main>
                </Route>
                <Route path={Routes.browse.tracks}>
                  <Main>
                    <BrowseTracksScreen />
                  </Main>
                </Route>
                <Route path={Routes.browse.albums}>
                  <Main>
                    <BrowseAlbumsScreen />
                  </Main>
                </Route>
                <Route path={Routes.browse.artists}>
                  <Main>
                    <BrowseArtistsScreen />
                  </Main>
                </Route>
                <Route path={Routes.browse.podcasts}>
                  <Main>
                    <BrowsePodcastsScreen />
                  </Main>
                </Route>
                <Route path={Routes.browse.playlists}>
                  <Main>
                    <BrowsePlaylistsScreen />
                  </Main>
                </Route>
                <Route path={Routes.pages.search}>
                  <Main>
                    <SearchScreen />
                  </Main>
                </Route>
                <Route path={Routes.pages.about}>
                  <Main>
                    <AboutScreen />
                  </Main>
                </Route>
                <Route path={Routes.album.show}>
                  <Main>
                    <TrackDetailScreen />
                  </Main>
                </Route>
                <Route path={Routes.artist.show}>
                  <Main>
                    <TrackDetailScreen />
                  </Main>
                </Route>
                <Route path={Routes.track.show}>
                  <Main>
                    <TrackDetailScreen />
                  </Main>
                </Route>
                <Route path={Routes.podcast.show}>
                  <Main>
                    <TrackDetailScreen />
                  </Main>
                </Route>
                <Route path={Routes.pages.users}>
                  <UsersScreen />
                </Route>
                <Route path={Routes.user.library.queue}>
                  <Main>
                    <QueueScreen />
                  </Main>
                </Route>
                <Route path={Routes.pages.login} exact>
                  <Plain>
                    <LoginScreen />
                  </Plain>
                </Route>
                <Route path={Routes.pages.library} exact>
                  <Main>
                    <LibraryScreen />
                  </Main>
                </Route>
                <Route path={Routes.user.library.tracks}>
                  <Main>
                    <YourTracksScreen />
                  </Main>
                </Route>
                <Route path={Routes.user.library.albums}>
                  <Main>
                    <YourAlbumsScreen />
                  </Main>
                </Route>
                <Route path={Routes.user.library.artists}>
                  <Main>
                    <YourArtistsScreen />
                  </Main>
                </Route>
                <Route path={Routes.user.library.podcasts}>
                  <Main>
                    <YourPodcastsScreen />
                  </Main>
                </Route>
                <Route path={Routes.user.library.playlists}>
                  <Main>
                    <YourPlaylistsScreen />
                  </Main>
                </Route>
                <Route path={Routes.auth.facebook}>
                  <Plain>
                    <FacebookAuth />
                  </Plain>
                </Route>
                <Route path={Routes.user.manage.home}>
                  <Main>
                    <ManageScreen />
                  </Main>
                </Route>
                <Route path={Routes.user.create.track}>
                  <Main>
                    <AddTrackScreen />
                  </Main>
                </Route>
                <Route path={Routes.user.create.album}>
                  <Main>
                    <CreateAlbumScreen />
                  </Main>
                </Route>
                <Route path={Routes.user.create.artist}>
                  <Main>
                    <AddArtistScreen />
                  </Main>
                </Route>
                {/* <Route path={Routes.user.create.playlist}>
                  <Main>
                    <CreatePlaylistScreen />
                  </Main>
                </Route> */}
                {/* User Account */}
                {/* <Route path={Routes.user.create.podcast}>
                  <Main>
                    <AddPodcastScreen />
                  </Main>
                </Route> */}
                {/* User Account */}
                <Route path={Routes.user.account}>
                  <Main>
                    <AccountScreen />
                  </Main>
                </Route>
                <Route>
                  <Plain>
                    <FourOFourScreen />
                  </Plain>
                </Route>
              </Switch>
            </Root>
          </Router>
        </PersistGate>
      </Provider>
    </ApolloProvider>
  );
}