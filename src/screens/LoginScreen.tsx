import React, { useState } from "react";
import { Redirect, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Form, Field } from 'react-final-form';
import { useApolloClient } from '@apollo/react-hooks'

import AppStateInterface from "../interfaces/AppStateInterface";
import TextField from "../components/TextField";
import Button from "../components/Button";
import { makeStyles } from "@material-ui/styles";
import { Grid } from "@material-ui/core";
import gql from "graphql-tag";
import { LOG_IN } from "../store/actions/types";
import colors from "../utils/colors";

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
  textField: {

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
  let { from } = location.state || { from: { pathname: "/" } };
  const currentUser = useSelector(({ currentUser }: AppStateInterface) => currentUser);

  const login = async (credentials: Credentials) => {
    try {
      const { data: { login: payload } } = await client.query({
        query: LOG_USER_IN,
        variables: { input: credentials },
        fetchPolicy: 'network-only'
      });
      dispatch({ type: LOG_IN, payload });
    } catch (error) {
      console.log(error);
    };
  };

  const loginWithFacebook = async () => {
    try {
      const { data: { facebookLoginUrl } } = await client.query({
        query: FACEBOOK_LOGIN_URL,
      });
      window.location = facebookLoginUrl.url;
    } catch (error) {
      console.log(error);
    };
  };

  if (currentUser.loggedIn) return <Redirect to={from} />;
  return (
    <div style={{ maxWidth: 450, margin: '0 auto', paddingTop: 30, textAlign: 'center' }}>
      <h1 style={{ fontSize: 12 }}>To continue, log in to MP3 Pam.</h1>
      <Button style={{ backgroundColor: '#3b5998', marginTop: 15, marginBottom: 15 }} size='large' onClick={loginWithFacebook}>Log In With Facebook</Button>
      <div className="divider" style={{
        fontSize: 16,
        fontWeight: 400,
        borderTop: '1px solid #d9dadc',
        lineHeight: '1px',
        marginTop: 30,
        marginBottom: 30,
        marginLeft: 0,
        marginRight: 0,
        position: 'relative',
        textAlign: 'center',
        height: 6,
        border: 0,
        background:
          `linear-gradient(to right,#181818 0%,#cd1b54 55%,#cd1b54 55%,#181818 100%)`,
      }}>
        <strong className="divider-title" style={{
          background: colors.contentGrey,
          fontSize: 12,
          letterSpacing: 1,
          paddingTop: 0,
          paddingRight: 20,
          paddingBottom: 0,
          paddingLeft: 20,
          textTransform: 'uppercase',
        }}>or</strong>
      </div>

      <Form
        onSubmit={login}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit} noValidate>
            <Grid>
              <Grid item>
                <Field name="email" validate={value => { if (!value) return "Your email is required" }}>
                  {({ input, meta }) => (
                    <>
                      <TextField
                        {...input}
                        id="email"
                        label="Email"
                        type="email"
                        margin="normal"
                        error={!!(meta.touched && meta.error)}
                        helperText={!!(meta.touched && meta.error) && meta.error}
                      />
                    </>
                  )}
                </Field>
              </Grid>
              <Grid item>
                <Field name="password" validate={value => { if (!value) return "Your password Required" }}>
                  {({ input, meta }) => (
                    <>
                      <TextField
                        {...input}
                        id="password"
                        label="Password"
                        type="password"
                        margin="normal"
                        error={!!(meta.touched && meta.error)}
                        helperText={!!(meta.touched && meta.error) && meta.error}
                      />
                    </>
                  )}
                </Field>
              </Grid>
            </Grid>
            <Button type="submit" size='large' style={{ marginTop: 15, marginBottom: 15 }}>Log In</Button>
          </form>
        )}</Form>
      <hr style={{
        marginTop: 30,
        marginBottom: 30,
        height: 6,
        border: 0,
        background:
          `linear-gradient(to right,#181818 0%,#cd1b54 55%,#cd1b54 55%,#181818 100%)`,
      }} />
      <h3>Don't have an account?</h3>
      <Button
        size='large'
        style={{
          marginTop: 15,
          marginBottom: 15,
          backgroundColor: colors.contentGrey,
          border: `1px solid ${colors.primary}`
        }}>Sign Up For MP3 Pam</Button>
    </div>
  );
}

export default LoginScreen;