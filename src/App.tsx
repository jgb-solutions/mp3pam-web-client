import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink, createHttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { ApolloProvider } from '@apollo/react-hooks';

// Main screens
import HomeScreen from './screens/HomeScreen';
import UploadScreen from './screens/UploadScreen';
import UsersScreen from './screens/UsersScreen'
import ListScreen from './screens/ListScreen';
import AboutScreen from './screens/AboutScreen';
import SearchScreen from './screens/SearchScreen';
import FourOFourScreen from './screens/FourOFourScreen';
import MainScreen from './components/layouts/MainScreen';

//  Routers
import Routes from './routes';

// Redux Store
import persistedStore from './store';

// Global Style
import './App.css';
import { LOG_OUT } from './store/actions/types';

const { store, persistor } = persistedStore();

const API_URL: string = process.env.NODE_ENV === 'development'
  ? `http://api.mp3pam.loc/graphql`
  : `https://api.mp3pam.com/graphql`;

// Apollo Client
const httpLink = createHttpLink({
  uri: API_URL,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token: string | null = store.getState().user.token
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
        graphQLErrors.map(({ message, locations, path, debugMessage }: any) => {
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
          )
          if (
            debugMessage === `Unauthenticated.` && !window.location.pathname.startsWith('/login')
          ) {
            client.clearStore();
            store.dispatch({ type: LOG_OUT });
          }
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
                <Route path={Routes.home} exact component={HomeScreen} />
                <Route path={Routes.search} exact component={SearchScreen} />
                <Route path={Routes.about} component={AboutScreen} />
                <Route path={Routes.upload} component={UploadScreen} />
                <Route path={Routes.list} component={ListScreen} />
                <Route path={Routes.users} component={UsersScreen} />
                <Route component={FourOFourScreen} />
              </Switch>
            </MainScreen>
          </Router>
        </PersistGate>
      </Provider>
    </ApolloProvider>
  );
}