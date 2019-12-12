import React, { useState } from "react";
import { Redirect, useLocation, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useApolloClient } from '@apollo/react-hooks'
import useForm from 'react-hook-form';
import gql from "graphql-tag";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

import Routes from "../../routes";
import colors from "../../utils/colors";
import Logo from "../../components/Logo";
import Button from "../../components/Button";
import Divider from '../../components/Divider';
import TextField from "../../components/TextField";
import { LOG_IN } from "../../store/actions/user_action_types";
import { emailRegex } from "../../utils/validators";
import AppStateInterface from "../../interfaces/AppStateInterface";

export const LOG_USER_IN = gql`
  query logUserIn($input: LoginInput!) {
    login(input: $input) {
      token
      data {
        name
        email
        active
        telephone
        created_at
      }
    }
  }
`;

export const FACEBOOK_LOGIN_URL = gql`
  query facebookLoginUrl {
    facebookLoginUrl {
      url
    }
  }
`;

const useStyles = makeStyles({
  facebookSignupButton: {
    marginTop: 15,
    marginBottom: 15,
    backgroundColor: colors.contentGrey,
    border: `1px solid ${colors.primary}`
  },
  facebookLoginButton: { backgroundColor: '#3b5998', marginTop: 15, marginBottom: 15 },
  errorTitle: {
    color: colors.error
  }
});

export interface Credentials {
  email: string;
  password: string;
};

function LoginScreen() {
  const client = useApolloClient();
  const dispatch = useDispatch()
  const styles = useStyles();
  const location = useLocation();
  const history = useHistory();
  const { register, errors, handleSubmit } = useForm<Credentials>({
    mode: 'onBlur'
  });
  const [loginError, setLoginError] = useState("")
  let { from } = location.state || { from: { pathname: "/" } };
  const currentUser = useSelector(({ currentUser }: AppStateInterface) => currentUser);

  const login = async (credentials: Credentials) => {
    try {
      const { data: { login: payload }, errors } = await client.query({
        query: LOG_USER_IN,
        variables: { input: credentials },
        fetchPolicy: 'network-only'
      });

      if (errors) {
        setLoginError("Your email or password is not valid.");
      }

      if (payload) {
        client.resetStore();
        dispatch({ type: LOG_IN, payload });
        history.push(Routes.pages.home);
      }
    } catch (error) {
      setLoginError(error.graphQLErrors[0].message);
    };
  };

  const loginWithFacebook = async () => {
    const fbMessage = "An error occurred with the Facebook login.";
    try {
      const { data: { facebookLoginUrl }, errors } = await client.query({
        query: FACEBOOK_LOGIN_URL,
      });
      if (errors) {
        console.log(errors);
        setLoginError(fbMessage)
      }
      window.location = facebookLoginUrl.url;
    } catch (error) {
      setLoginError(fbMessage);
      console.log(error);
    };
  };

  if (currentUser.loggedIn) return <Redirect to={from} />;

  return (
    <div style={{ maxWidth: 450, margin: '0 auto', textAlign: 'center' }}>
      <Logo size={300} />
      {/* <h1 style={{ fontSize: 12 }}>To continue, log in to MP3 Pam.</h1> */}
      <Button className={styles.facebookLoginButton} size='large' onClick={loginWithFacebook}>Log In With Facebook</Button>

      <Divider>or</Divider>


      <form onSubmit={handleSubmit(login)} noValidate>
        {loginError && <h3 className={styles.errorTitle} dangerouslySetInnerHTML={{ __html: loginError }} />}
        <Grid>
          <Grid item>
            <TextField
              inputRef={register({
                required: "The email is required.",
                pattern: {
                  value: emailRegex,
                  message: "This email is not valid."
                }
              })}
              name="email"
              id="email"
              label="Email"
              type="email"
              margin="normal"
              error={!!errors.email}
              helperText={errors.email && errors.email.message}
            />
          </Grid>
          <Grid item>
            <TextField
              inputRef={register({
                required: "Your password Required.",
                minLength: {
                  value: 6,
                  message: "The password must be at least 6 characters."
                }
              })}
              name="password"
              id="password"
              label="Password"
              type="password"
              margin="normal"
              error={!!errors.password}
              helperText={errors.password && errors.password.message}
            />
          </Grid>
        </Grid>
        <Button type="submit" size='large' style={{ marginTop: 15, marginBottom: 15 }}>Log In With Email</Button>
      </form>

      <Divider.HR />

      <h3>Don't have an account?</h3>

      <Button
        size='large'
        onClick={loginWithFacebook}
        className={styles.facebookSignupButton}>Sign Up With Facebook</Button>
    </div>
  );
}

export default LoginScreen;