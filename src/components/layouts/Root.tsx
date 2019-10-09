import React, { ReactNode } from 'react';
import { CssBaseline, Grid } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";

import Player from '../Player';

import colors from "../../utils/colors";

export const useStyles = makeStyles({
  container: {
    backgroundColor: colors.black,
    maxWidth: 1200,
    margin: '0 auto',
  },
});

export default function Root({ children }: { children: ReactNode }) {
  const styles = useStyles();

  return (
    <>
      <CssBaseline />
      <Grid container className={styles.container}>
        {children}
      </Grid>
      <Player />
    </>
  );
};
