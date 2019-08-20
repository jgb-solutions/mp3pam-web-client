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
import Button from '@material-ui/core/Button';


import * as playerActions from '../store/actions/playerActions';
import colors from '../utils/colors';
import Routes from '../routes';

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
  primaryBtn: {
    backgroundColor: colors.primary,
    color: colors.white,
    paddingLeft: 40,
    paddingRight: 40,
    height: 30,
    border: 'none',
    borderRadius: 20,
    fontWeight: 'bold',
    fontSize: 12,
    letterSpacing: 1,
    transition: 'all .1s ease-in-out',
    '&:hover': {
      transform: 'scale(1.1)',
      backgroundColor: lighten(colors.primary, 0.1)
    },
    '&:active': {
      outline: 'none',
    },
    '&:focus': {
      outline: 'none',
    },
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

const Set = props => {
  const styles = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }
  const set = [{
    title: 'Really great News',
    detail:
      "Cat, 'if you don't explain it is right?' 'In my youth,' Father William replied to his ear. Alice considered a little, and then said 'The fourth.' 'Two days wrong!' sighed the Lory, as soon as she.",
    lyrics:
      "She went in without knocking, and hurried off at once, while all the jurymen are back in a minute or two, they began moving about again, and looking at them with large round eyes, and half believed herself in Wonderland, though she knew that it might tell her something worth hearing. For some minutes it puffed away without speaking, but at the bottom of the court. 'What do you mean \"purpose\"?' said Alice. 'Then you should say what you would seem to come once a week: HE taught us Drawling, Stretching, and Fainting in Coils.' 'What was THAT like?' said Alice. 'Well, I never heard of \"Uglification,\"' Alice ventured to ask. 'Suppose we change the subject,' the March Hare and the Mock Turtle, 'but if they do, why then they're a kind of serpent, that's all I can say.' This was such a puzzled expression that she was now only ten inches high, and her eyes filled with tears again as she could. 'The game's going on between the executioner, the King, 'or I'll have you executed, whether you're a.",
    url: '/api/v1/musics/42139505',
    play_count: 0,
    play_url: 'https://audios.mp3pam.com/OMVR-Bad-News.mp3',
    download_count: 0,
    download_url: '/t/42139505',
    image: 'https://images.mp3pam.com/demo/artist3.jpg',
    favorite: true,
    category: {
      name: 'Konpa',
      slug: 'konpa',
      url: '/api/v1/categories/konpa'
    },
  }];

  return (
    <>
      <div className={styles.row}>
        <div className={styles.setCover}>
          <img src={set[0].image} alt={'hello'} />
        </div>
        <div className={styles.setDetails}>
          <h5 className={styles.setType}>Album</h5>
          <h1 className={styles.setName}>Gen Gen Geng</h1>
          <p className={styles.setByAuthor}>
            <span className={styles.setBy}>By </span>
            <Link
              to={Routes.goToAuthorDetail('authorId')}
              className={styles.setAuthor}>
                Konpa Kreyòl
            </Link>
          </p>
          <div className={styles.buttonActions}>
            <button className={styles.primaryBtn}>
              Play
            </button>
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
  null,
  {
    playSet: playerActions.playSet,
    pauseSet: playerActions.pauseSet
  }
)(withRouter(Set));