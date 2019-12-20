import React, { ReactNode } from 'react'
import { Grid } from '@material-ui/core'


import Content from '../Content'

import { plainLayoutStyles } from '../../styles/plainLayoutStyles'

type Props = { children: ReactNode }

export default function PlainLayout({ children }: Props) {
  const styles = plainLayoutStyles()

  return (
    <>
      <Grid item sm={12} xs={12} className={`${styles.col} ${styles.mainGrid}`}>
        <Content className={styles.col}>{children}</Content>
      </Grid>
    </>
  )
}
