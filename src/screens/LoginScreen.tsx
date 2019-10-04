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
`

const useStyles = makeStyles({
  textField: {

  }
});

function LoginScreen() {
  const client = useApolloClient();
  const dispatch = useDispatch()
  const styles = useStyles();
  const location = useLocation();
  const [redirectToReferrer, setRedirectToReferrer] = useState(false);
  let { from } = location.state || { from: { pathname: "/" } };
  const currentUser = useSelector(({ currentUser }: AppStateInterface) => currentUser);

  type Credentials = {
    email: string,
    password: string,
  }

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

  if (currentUser.loggedIn) return <Redirect to={from} />;
  if (redirectToReferrer) return <Redirect to={from} />;

  return (
    <>
      <h1>Log In</h1>

      <p>You must log in to view the page at {from.pathname}</p>

      <Form
        onSubmit={login}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit} noValidate>
            <Grid>
              <Grid item>
                <Field name="email">
                  {({ input, meta }) => (
                    <>
                      <TextField
                        {...input}
                        id="name"
                        label="Name"
                        margin="normal"
                      />
                      {meta.touched && meta.error && <span>{meta.error}</span>}
                    </>
                  )}
                </Field>
              </Grid>
              <Grid item>
                <Field name="password">
                  {({ input, meta }) => (
                    <>
                      <TextField
                        {...input}
                        id="password"
                        label="password"
                        type="password"
                        margin="normal"
                      />
                      {meta.touched && meta.error && <span>{meta.error}</span>}
                    </>
                  )}
                </Field>
              </Grid>
            </Grid>
            <Button type="submit">Submit</Button>
          </form>
        )}</Form>
    </>
  );
}

export default LoginScreen;