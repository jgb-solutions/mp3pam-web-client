import React, { ReactNode } from 'react';
import { CssBaseline, Grid } from '@material-ui/core';


import Content from '../Content';
import { useStyles } from './Main';
import colors from '../../utils/colors';

type Props = { children: ReactNode };

export default function Plain({ children }: Props) {
  const styles = useStyles();

  return (
    <>
      <CssBaseline />
      <Grid container className={styles.container}>
        <Grid item sm={12} xs={12} className={`${styles.col} ${styles.mainGrid}`}>
          <Content className={styles.col}>{children}</Content>
        </Grid>
      </Grid>
    </>
  );
};
