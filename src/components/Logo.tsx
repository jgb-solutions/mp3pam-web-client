import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";

import Routes from "../routes";

const useStyles = makeStyles({
  logo: {
    maxWidth: "100%",
    width: "200px",
  },
  logoLink: {
    marginBottom: 20,
    display: 'inline-block',
  },
});


export default function Logo({ style, size }: { style?: string, size?: number }) {
  const styles = useStyles();

  let sizes = undefined;

  if (size) {
    sizes = {
      width: size,
      height: 'auto'
    }
  }

  return (
    <>
      <Link to={Routes.pages.home} className={styles.logoLink}>
        <img
          style={sizes}
          className={styles.logo}
          src="/assets/images/logo-trans-red-white.png"
          alt="MP3 Pam logo"
        />
      </Link>
    </>
  );
};