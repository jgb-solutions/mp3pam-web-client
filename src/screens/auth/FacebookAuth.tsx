import React, { useEffect } from 'react';
import Spinner from '../../components/Spinner';
import { useRouteMatch, useLocation, useHistory } from 'react-router';
import { get } from 'lodash-es';
import queryString from 'query-string';
import gql from 'graphql-tag';
import { useApolloClient } from '@apollo/react-hooks';
import { useDispatch } from 'react-redux';
import { LOG_IN } from '../../store/actions/types';
import CheckAuth from '../../components/CheckAuth';

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
  const match = useRouteMatch();
  const location = useLocation();
  const history = useHistory();
  console.log('location', location)

  useEffect(() => {
    const { pathname, search } = location;
    const { code } = queryString.parse(search)
    // history.push({ pathname: location.pathname, search: location.search })
    if (code) {
      login(String(code));
    }
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
    } catch (error) {
      console.log(error);
    };
  }

  return (
    <CheckAuth>
      <h1>Logging you in with Facebook</h1>
      <Spinner />
    </CheckAuth>
  );
};
