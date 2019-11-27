import React from "react";
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


export default function LOGOJGB({ style, size }: { style?: string, size?: number }) {
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
      <a
        target="_blank"
        href={Routes.links.jgbSolutions}
        className={styles.logoLink}
        rel="noopener noreferrer">
        <img
          style={sizes}
          className={`${styles.logo} ${style}`}
          src="/assets/images/Logo-JGB-Solutions-500x110.png"
          alt="JGB Solutions logo"
        />
      </a>
    </>
  );
};