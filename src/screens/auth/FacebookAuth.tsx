import React, { useEffect } from 'react';
import { useLocation, useHistory, Redirect } from 'react-router';
import gql from 'graphql-tag';
import queryString from 'query-string';
import { useApolloClient } from '@apollo/react-hooks';
import { useDispatch } from 'react-redux';

import Routes from '../../routes';
import Spinner from '../../components/Spinner';
import { LOG_IN } from '../../store/actions/user_action_types';

const FACEOOK_LOGIN = gql`
  mutation facebookLogin($code: String!) {
    handleFacebookConnect(code: $code) {
      data {
        name
        email
        active
        avatar
        telephone
        created_at
      }
      token
      firstLogin
    }
  }
`;

export default function FacebookAuth() {
  const client = useApolloClient();
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const { code } = queryString.parse(location.search)

  useEffect(() => {
    if (code) {
      login(String(code));
    }
    // eslint-disable-next-line
  }, []);

  const login = async (code: string) => {
    try {
      const { data } = await client.mutate({
        mutation: FACEOOK_LOGIN,
        variables: { code },
        fetchPolicy: 'no-cache'
      });
      const { handleFacebookConnect } = data;
      const { firstLogin, ...payload } = handleFacebookConnect;
      console.log(handleFacebookConnect);
      dispatch({ type: LOG_IN, payload });
      history.push(Routes.pages.home)
    } catch (error) {
      console.log(error);
    };
  }

  return code ? (
    <>
      <h1>Logging you in with Facebook</h1>
      <Spinner />
    </>
  ) : <Redirect to={Routes.pages.login} />
};
