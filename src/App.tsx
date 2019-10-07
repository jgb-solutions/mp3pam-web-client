import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  RouteComponentProps,
  useLocation
} from 'react-router-dom';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { ApolloProvider } from '@apollo/react-hooks';
import { get } from 'lodash-es';

// Main screens
import ListScreen from './screens/ListScreen';
import HomeScreen from './screens/HomeScreen';
import UsersScreen from './screens/UsersScreen';
import QueueScreen from './screens/QueueScreen';
import LoginScreen from './screens/LoginScreen';
import AboutScreen from './screens/AboutScreen';
import UploadScreen from './screens/UploadScreen';
import SearchScreen from './screens/SearchScreen';
import FourOFourScreen from './screens/FourOFourScreen';
import MainScreen from './components/layouts/MainScreen';
// Library/Favorites Screens
import LibraryScreen from './screens/LibraryScreen';
import LikedTracksScreen from './screens/LikedTracksScreen';
import LikedAlbumsScreen from './screens/LikedAlbumsScreen';
import LikedArtistsScreen from './screens/LikedArtistsScreen';
import LikedPodcastsScreen from './screens/LikedPodcastsScreen';
// Browse screens
import BrowseScreen from './screens/BrowseScreen';
import BrowseTracksScreen from './screens/BrowseTracksScreen';
import BrowseAlbumsScreen from './screens/BrowseAlbumsScreen';
import BrowseArtistsScreen from './screens/BrowseArtistsScreen';
import BrowsePodcastsScreen from './screens/BrowsePodcastsScreen';

//  Routers
import Routes from './routes';

// Redux Store
import persistedStore from './store';

// Global Style
import './App.css';

import { LOG_OUT } from './store/actions/types';

const { store, persistor } = persistedStore();

export const API_URL: string = process.env.NODE_ENV === 'development'
  ? `http://api.mp3pam.loc/graphql`
  : `https://api.mp3pam.com/graphql`;

// Apollo Client
const httpLink = createHttpLink({
  uri: API_URL,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token: string | null = get(store.getState(), `currentUser.token`)
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ``,
    }
  }
});

// const errorLink =
// const link = errorLink.concat(authLink.concat(httpLink));
const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        console.log('graphql errors', graphQLErrors);
        graphQLErrors.forEach(({ message, locations, path, debugMessage }: any) => {
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
          )
          if (
            debugMessage === `Unauthenticated.` && !window.location.pathname.startsWith('/login')
          ) {
            client.clearStore();
            store.dispatch({ type: LOG_OUT });
          }
          // eslint-disable-next-line
        });

        // client.mutate({
        //   mutation: notificationAddMutation,
        //   variables: {
        //     text:
        //       'You did not have rights to this operation. Maybe logged out?',
        //   },
        // });
        // }
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
    authLink,
    httpLink
  ]),
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router>
            <MainScreen>
              <Switch>
                <Route path={Routes.pages.home} exact>
                  <HomeScreen />
                </Route>
                <Route path={Routes.pages.browse} exact>
                  <BrowseScreen />
                </Route>
                <Route path={Routes.browse.tracks}>
                  <BrowseTracksScreen />
                </Route>
                <Route path={Routes.browse.albums}>
                  <BrowseAlbumsScreen />
                </Route>
                <Route path={Routes.browse.artists}>
                  <BrowseArtistsScreen />
                </Route>
                <Route path={Routes.browse.podcasts}>
                  <BrowsePodcastsScreen />
                </Route>
                <Route path={Routes.pages.search}>
                  <SearchScreen />
                </Route>
                <Route path={Routes.pages.about}>
                  <AboutScreen />
                </Route>
                <Route path={Routes.album.show}>
                  <ListScreen />
                </Route>
                <Route path={Routes.artist.show}>
                  <ListScreen />
                </Route>
                <Route path={Routes.track.show}>
                  <ListScreen />
                </Route>
                <Route path={Routes.podcast.show}>
                  <ListScreen />
                </Route>
                <Route path={Routes.pages.users}>
                  <UsersScreen />
                </Route>
                <Route path={Routes.user.queue}>
                  <QueueScreen />
                </Route>
                <Route path={Routes.pages.login}>
                  <LoginScreen />
                </Route>
                <Route path={Routes.pages.library} exact>
                  <LibraryScreen />
                </Route>
                <Route path={Routes.user.tracks}>
                  <LikedTracksScreen />
                </Route>
                <Route path={Routes.user.albums}>
                  <LikedAlbumsScreen />
                </Route>
                <Route path={Routes.user.artists}>
                  <LikedArtistsScreen />
                </Route>
                <Route path={Routes.user.podcasts}>
                  <LikedPodcastsScreen />
                </Route>
                <Route path={Routes.pages.upload}>
                  <UploadScreen />
                </Route>
                <Route>
                  <FourOFourScreen />
                </Route>
              </Switch>
            </MainScreen>
          </Router>
        </PersistGate>
      </Provider>
    </ApolloProvider>
  );
}