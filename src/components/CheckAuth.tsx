import React, { ReactNode } from 'react'
import { useLocation, Redirect } from 'react-router'
import { useSelector } from 'react-redux'

import AppStateInterface from "../interfaces/AppStateInterface"
import Routes from '../routes'

export default function CheckAuth({ children, className }: { children: ReactNode, className?: string }) {
  const location = useLocation()
  const currentUser = useSelector(({ currentUser }: AppStateInterface) => currentUser)

  return (currentUser.loggedIn) ? <div className={className}>{children}</div> : (
    <Redirect
      to={{
        pathname: Routes.pages.login,
        state: { from: location }
      }}
    />
  )
}
