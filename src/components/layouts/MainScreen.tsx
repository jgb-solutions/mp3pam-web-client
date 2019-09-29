import React, { ReactNode } from 'react';
import { CssBaseline, Grid } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import Hidden from '@material-ui/core/Hidden';

import Player from '../Player';
import Left from '../Left';
import Right from '../Right';
import Content from '../Content';
import Header from '../Header';

import colors from "../../utils/colors";

const useStyles = makeStyles(theme => ({
  container: {
    backgroundColor: colors.black,
    maxWidth: 1200,
    margin: '0 auto',
  },
  col: {
    height: '100vh',
    overflowY: 'scroll'
  },
  mainGrid: {
    backgroundColor: colors.contentGrey,
    position: 'relative'
  },
  leftGrid: {
    paddingTop: 10,
    paddingLeft: 24,
    paddingRight: 24,
    backgroundColor: colors.black,
  },
  rightGrid: {
    paddingTop: 10,
    paddingLeft: 24,
    paddingRight: 24,
    backgroundColor: colors.black
  }
}));

const MainScreen = (props: { style?: Object, children: ReactNode }) => {
  const styles = useStyles();

  return (
    <>
      <CssBaseline />
      <Grid container className={styles.container}>
        <Hidden xsDown>
          <Grid item md={2} sm={3} xs={12} className={`${styles.col} ${styles.leftGrid}`}>
            <Left />
          </Grid>
        </Hidden>
        <Grid item md={8} sm={9} xs={12} className={`${styles.col} ${styles.mainGrid}`}>
          <Header />
          <Content className={styles.col}>{props.children}</Content>
        </Grid>

        <Hidden smDown>
          <Grid item md={2} sm={2} xs={12} className={`${styles.col} ${styles.rightGrid}`}>
            <Right />
          </Grid>
        </Hidden>
      </Grid>
      <Player />
    </>
  );
};

export default MainScreen;
