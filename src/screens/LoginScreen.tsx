import React, { useState } from "react";
import { Redirect, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import AppStateInterface from "../interfaces/AppStateInterface";

function LoginScreen() {
  const location = useLocation();
  const [redirectToReferrer, setRedirectToReferrer] = useState(false);
  let { from } = location.state || { from: { pathname: "/" } };
  const currentUser = useSelector(({ currentUser }: AppStateInterface) => currentUser);

  const login = () => {
    // fakeAuth.authenticate(() => {
    //   this.setState({ redirectToReferrer: true });
    // });
  };

  if (currentUser.loggedIn) return <Redirect to={from} />;
  if (redirectToReferrer) return <Redirect to={from} />;

  return (
    <>
      <h1>Log In</h1>

      <p>You must log in to view the page at {from.pathname}</p>
      <button onClick={login}>Log in</button>
    </>
  );
}

export default LoginScreen;