import React, { ReactNode } from 'react';
import { Grid } from '@material-ui/core';

export default function TextIcon({ icon, text }: { icon: ReactNode, text: string }) {
  return (
    <Grid container direction="row" alignItems="center">
      <Grid item>{icon}</Grid>
      <Grid item>&nbsp;{text}</Grid>
    </Grid>
  )
}