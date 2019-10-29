import React, { ReactNode } from 'react';
import { Grid } from '@material-ui/core';
import Hidden from '@material-ui/core/Hidden';

import Left from '../Left';
import Right from '../Right';
import Content from '../Content';
import Header from '../Header';

import { mainLayoutStyles } from '../../styles/mainLayoutStyles';


export default function MainLayout({ children }: { children: ReactNode }) {
  const styles = mainLayoutStyles()

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
