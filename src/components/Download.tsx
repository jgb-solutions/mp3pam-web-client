import React from 'react';

import Button from './Button';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30
  },
  button: {
    minWidth: 150,
  }
});

type Props = {
  hash: string,
  type: string,
}
export default function Download({ type, hash }: Props) {
  const styles = useStyles();

  const handleDownload = () => {
    alert(`Download ${type} with a hash of ${hash}`)
  };

  return (
    <div className={styles.root}>
      <Button
        size="large"
        className={styles.button}
        onClick={handleDownload}>
        Download
      </Button>
    </div>
  )
}