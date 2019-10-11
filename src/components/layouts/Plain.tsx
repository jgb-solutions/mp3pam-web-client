import React, { ReactNode } from 'react';
import { Grid } from '@material-ui/core';


import Content from '../Content';
import { useStyles } from './Main';

type Props = { children: ReactNode };

export default function Plain({ children }: Props) {
  const styles = useStyles();

  return (
    <>
      <Grid item sm={12} xs={12} className={`${styles.col} ${styles.mainGrid}`}>
        <Content className={styles.col}>{children}</Content>
      </Grid>
    </>
  );
};
