import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// Main screens
import HomeScreen from './screens/HomeScreen';
import UploadScreen from './screens/UploadScreen';
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
const LoadingImage = props => (
  <svg
    width={200}
    height={200}
    viewBox="0 0 100 100"
    preserveAspectRatio="xMidYMid"
    className="prefix__lds-eclipse"
    style={{
      background: '0 0',
    }}
    {...props}
  >
    <path
      d="M90.004 51.834a40 40 0 00-80 .332 40 42-.238 0180-.332"
      fill="#cd1b54"
    >
      <animateTransform
        attributeName="transform"
        type="rotate"
        calcMode="linear"
        values="0 50 51;360 50 51"
        keyTimes="0;1"
        dur="1s"
        begin="0s"
        repeatCount="indefinite"
      />
    </path>
  </svg>
)
const { store, persistor } = persistedStore();

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingImage />} persistor={persistor}>
        <Router>
          <MainScreen>
            <Switch>
              <Route path={Routes.root} exact component={HomeScreen} />
              <Route path={Routes.search} exact component={SearchScreen} />
              <Route path={Routes.about} component={AboutScreen} />
              <Route path={Routes.upload} component={UploadScreen} />
              <Route component={FourOFourScreen} />
            </Switch>
          </MainScreen>
        </Router>
      </PersistGate>
    </Provider>
  );
}