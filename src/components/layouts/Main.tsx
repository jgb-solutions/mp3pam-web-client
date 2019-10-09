import React, { ReactNode } from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import Hidden from '@material-ui/core/Hidden';

import Left from '../Left';
import Right from '../Right';
import Content from '../Content';
import Header from '../Header';

import colors from "../../utils/colors";

export const useStyles = makeStyles(theme => ({
  container: {
    backgroundColor: colors.black,
    maxWidth: 1200,
    margin: '0 auto',
  },
  col: {
    height: '100vh',
    overflowY: 'auto'
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

export default function Main({ children }: { children: ReactNode }) {
  const styles = useStyles();

  return (
    <>
      <Hidden xsDown>
        <Grid item md={2} sm={3} xs={12} className={`${styles.col} ${styles.leftGrid}`}>
          <Left />
        </Grid>
      </Hidden>

      <Grid item md={8} sm={9} xs={12} className={`${styles.col} ${styles.mainGrid}`}>
        <Header />
        <Content className={styles.col}>{children}</Content>
      </Grid>

      <Hidden smDown>
        <Grid item md={2} sm={2} xs={12} className={`${styles.col} ${styles.rightGrid}`}>
          <Right />
        </Grid>
      </Hidden>
    </>
  );
};
