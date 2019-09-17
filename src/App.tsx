import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
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

const { store, persistor } = persistedStore();

// Apollo Client
const client = new ApolloClient({
  uri: `http://api.mp3pam.loc/graphql`
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