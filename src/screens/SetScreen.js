// @flow

import {
  FavoriteBorderRounded,
  MoreHorizOutlined
} from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import React, { useState, useEffect } from 'react';
import { makeStyles, lighten, darken } from '@material-ui/core/styles';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import * as playerActions from '../store/actions/playerActions';
import colors from '../utils/colors';
import Routes from '../routes';
import Button from '../components/Button';

const useStyles = makeStyles(theme => ({
  row: {
    display: 'flex',
    flexDirection: 'row'
  },
  setCover: {
    width: 220,
    height: 220,
    marginRight: 20,
    '& img': {
      maxWidth: '100%',
    }
  },
  setByAuthor: {
    fontSize: 12,
  },
  setBy: {
    color: darken(colors.white, 0.5)
  },
  setAuthor: {
    textDecoration: 'none',
    color: colors.white,
    '&:hover': {
      textDecoration: 'underline',
    },
    '&:link': {
      textDecoration: 'none',
      color: 'white',
    },
  },
  setDetails: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    '& > *': {
      padding: 0,
      margin: 0,
    },
  },
  setType: {
    fontSize: 12,
    fontWeight: 'thin',
    textTransform: 'uppercase',
  },
  setName: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  iconBtn: {

  },
  icon: {
    color: colors.white,
    fontSize: 30,
    padding: 5,
    border: '1px solid white',
    borderRadius: '50%',
  }
}));

const Set = (props: { playSet: Function, pauseSet: Function }) => {
  const styles = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  const togglePlay = () => {
    if (props.isPlaying && props.setID === set.id) {
      props.pauseSet();
      console.log('pausing set')
    }

    if (!props.isPlaying && props.setID === set.id) {
      props.resumeSet();
      console.log('resuming set')
    }

    if (props.setID !== set.id) {
      props.playSet(set);
      console.log('play set')
    }
  }
  const set = {
    id: 23423423,
    type: 'Album',
    name: 'Gen Gen Geng',
    image: 'https://images.mp3pam.com/demo/artist3.jpg',
  };

  return (
    <>
      <div className={styles.row}>
        <div className={styles.setCover}>
          <img src={set.image} alt={set.name} />
        </div>
        <div className={styles.setDetails}>
          <h5 className={styles.setType}>{set.type}</h5>
          <h1 className={styles.setName}>{set.name}</h1>
          <p className={styles.setByAuthor}>
            <span className={styles.setBy}>By </span>
            <Link
              to={Routes.goToAuthorDetail('authorId')}
              className={styles.setAuthor}>
                Konpa Kreyòl
            </Link>
          </p>
          <div className={styles.buttonActions}>
            <Button onClick={togglePlay}>
              {props.isPlaying && props.setID === set.id ? 'Pause': 'Play'}
            </Button>
            <IconButton className={styles.iconBtn}>
              <FavoriteBorderRounded className={styles.icon} />
            </IconButton>
            <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
              <MoreHorizOutlined className={styles.icon} />
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
          </div>
        </div>
      </div>
    </>
  );
}

export default connect(
  ({ player }) => ({
    setID: player.set.id,
    isPlaying: player.isPlaying
  }),
  {
    playSet: playerActions.playSet,
    pauseSet: playerActions.pauseSet,
    resumeSet: playerActions.resumeSet,
  }
)(withRouter(Set));