import React, { useEffect } from 'react'
import { useLocation, useHistory, Redirect } from 'react-router'
import queryString from 'query-string'
// import { useApolloClient } from '@apollo/react-hooks'
import { useDispatch, useSelector } from 'react-redux'

import Routes from '../../routes'
import Spinner from '../../components/Spinner'
import { LOG_IN } from '../../store/actions/user_action_types'
// import { FACEOOK_LOGIN } from '../../graphql/mutations'
import AppStateInterface from '../../interfaces/AppStateInterface'
import UserInterface from '../../interfaces/UserInterface'

export default function FacebookAuth() {
  // const client = useApolloClient()
  const dispatch = useDispatch()
  const location = useLocation()
  const history = useHistory()
  const { response } = queryString.parse(location.search)
  const currentUser = useSelector(({ currentUser }: AppStateInterface) => currentUser)

  useEffect(() => {
    if (response) {
      login(JSON.parse(String(response)))
    }
    // eslint-disable-next-line
  }, [])

  const login = async (response: UserInterface | { error: boolean }) => {
    console.log(response)
    if ('error' in response) {
      console.log(response)
      history.push(Routes.pages.login)
    } else {
      dispatch({ type: LOG_IN, payload: response })

      if (response.data) {
        if (response.data.firstLogin) {
          history.push(Routes.user.account, { editMode: true })
        } else {
          history.push(Routes.pages.home)
        }
      }
    }
  }

  if (currentUser.loggedIn) {
    return <Redirect to={Routes.pages.home} />
  }

  return response ? (
    <>
      <h1>Logging you in with Facebook</h1>
      <Spinner />
    </>
  ) : <Redirect to={Routes.pages.login} />
}
