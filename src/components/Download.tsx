import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

import Button from './Button';
import useDownload from '../hooks/useDownload';
import colors from '../utils/colors';
import Spinner from './Spinner';

const useStyles = makeStyles({
  root: {
    padding: 30
  },
  button: {
    minWidth: 150,
  },
  counterContainer: {
    backgroundSize: "contain",
    cursor: "pointer",
    width: 175,
    height: 175,
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  transparentBackground: {
    position: "absolute",
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  count: {
    fontSize: 48,
  },
  successColor: { color: colors.success }
});

type Props = {
  hash: string,
  type: string,
  hideDownloadButton?: boolean
}

let intervalId: any;

export default function Download({ hideDownloadButton, ...input }: Props) {
  const { data, loading, error, fetchDownloadUrl, updateDownloadCount } = useDownload(input)
  const styles = useStyles();
  const [count, setCount] = useState(5);

  useEffect(() => {
    if (hideDownloadButton) {
      fetchDownloadUrl();
    }
  }, [])

  const startDownload = () => {
    intervalId = setInterval(() => {
      if (count >= 0) {
        setCount(count => count - 1)
      }
    }, 1000);
  };

  useEffect(() => {
    if (count <= 0) {
      clearInterval(intervalId);
      updateDownloadCount();
      window.location.href = data.download.url;
    }
  }, [count])

  useEffect(() => {
    if (data) {
      startDownload();
    }
  }, [data])

  if (loading) return <Spinner.Full />
  if (error) return <p>There was an error fetching the download url. Try again.</p>

  return (
    <div className={styles.root}>
      {(!data && !hideDownloadButton) && (
        <Button
          size="large"
          className={styles.button}
          onClick={fetchDownloadUrl}
          disabled={loading}>
          Download
        </Button>
      )}

      {data && (
        <div style={{ textAlign: 'center' }}>
          {count > 0 && <h3>Your Download will start in:</h3>}
          <div className={styles.counterContainer}
            style={{ backgroundImage: `url(/assets/images/loader.svg)` }}>
            <div className={styles.transparentBackground}>
              <span className={styles.count}>
                {count > 0 ? count : (
                  <CheckCircleIcon style={{ fontSize: 48 }} className={styles.successColor} />
                )}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}