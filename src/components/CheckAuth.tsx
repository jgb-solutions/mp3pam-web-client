import React, { ReactNode } from 'react'
import { useLocation, Redirect } from 'react-router';
import { useSelector } from 'react-redux';

import AppStateInterface from "../interfaces/AppStateInterface";
import Routes from '../routes';

export default function CheckAuth({ children }: { children: ReactNode }) {
  const location = useLocation();
  const currentUser = useSelector(({ currentUser }: AppStateInterface) => currentUser);

  return (currentUser.loggedIn) ? <>{children}</> : (
    <Redirect
      to={{
        pathname: Routes.pages.login,
        state: { from: location }
      }}
    />
  )
}
;