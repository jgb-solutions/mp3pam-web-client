import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// Main screens
import HomeScreen from './screens/Home';
import UploadScreen from './screens/Upload';
import AboutScreen from './screens/About';
import SearchScreen from './screens/Search';
import FourOFour from './screens/FourOFour';
import Main from './components/layouts/Main';

//  Routers
import Routes from './routes';

// Redux Store
import persistedStore from './store';

// Global Style
import './App.css';

const { store, persistor } = persistedStore();

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Main>
            <Switch>
              <Route path={Routes.root} exact component={HomeScreen} />
              <Route path={Routes.search} exact component={SearchScreen} />
              <Route path={Routes.about} component={AboutScreen} />
              <Route path={Routes.upload} component={UploadScreen} />
              <Route component={FourOFour} />
            </Switch>
          </Main>
        </Router>
      </PersistGate>
    </Provider>
  );
}