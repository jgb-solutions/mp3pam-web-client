import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { Link } from 'react-router-dom';

import Left from './Left';
import colors from '../utils/colors';
import Search from './Search';
import { SMALL_SCREEN_SIZE } from '../utils/constants';
import Routes from '../routes';
import AppStateInterface from '../interfaces/AppStateInterface';
import { useSelector } from 'react-redux';

const useStyles = makeStyles(theme => ({
  grow: {
    flex: 1,
    backgroundColor: colors.black,
    [theme.breakpoints.up(SMALL_SCREEN_SIZE)]: {
      position: 'relative',
    }
  },
  appBar: {
    width: '100%',
    backgroundColor: colors.black,
    position: "absolute",
  },
  toolbar: {
    flex: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    }
  },
  accountButton: {

  },
  drawer: {
    backgroundColor: colors.black,
    height: '100vh',
    padding: 24,
    paddingTop: 10,
    width: 230
  },
  leftMenuIcon: {
    paddingLeft: 0,
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  },
  moreIcon: {
    paddingRight: 0,
  },
  loginButton: {
    color: colors.white
  }
}));

type Props = {};

const Header = (props: Props) => {
  const classes = useStyles();
  const [drawerLeftOPen, setDrawerLeftOpen] = useState(false);
  const [drawerRightOPen, setDrawerRightOpen] = useState(false);
  const currentUser = useSelector(({ currentUser }: AppStateInterface) => currentUser);
  const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

  return (
    <div className={classes.grow}>
      <AppBar className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            aria-label="Open left menu"
            onClick={() => setDrawerLeftOpen(true)}
            color="inherit"
            className={classes.leftMenuIcon}>
            <MenuIcon />
          </IconButton>
          <Search />
          <div className={classes.grow} />
          <div className={classes.accountButton}>
            {
              currentUser.loggedIn ? (
                <IconButton
                  aria-label="Account"
                  onClick={() => setDrawerRightOpen(true)}
                  color="inherit"
                  className={classes.moreIcon}>
                  <AccountCircle />
                </IconButton>

              ) : (
                  <Link to={Routes.pages.login}
                    className={classes.loginButton}
                  >
                    <IconButton
                      aria-label="Login"
                      color="inherit"
                      className={classes.moreIcon}>
                      <AccountCircle />
                    </IconButton>
                  </Link>
                )
            }
          </div>
        </Toolbar>
      </AppBar>
      {/* Left Drawer */}
      <SwipeableDrawer
        onOpen={() => setDrawerLeftOpen(true)}
        open={drawerLeftOPen}
        onClose={() => setDrawerLeftOpen(false)}
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
      >
        <div className={classes.drawer}>
          <Left closeDrawerLeft={setDrawerLeftOpen} />
        </div>
      </SwipeableDrawer>
      {currentUser.loggedIn && (
        <SwipeableDrawer
          onOpen={() => setDrawerRightOpen(true)}
          anchor='right' open={drawerRightOPen}
          onClose={() => setDrawerRightOpen(false)}
          disableBackdropTransition={!iOS}
          disableDiscovery={iOS}
        >
          <div className={classes.drawer}>
            {/* <Right closeDrawerRight={setDrawerRightOpen} /> */}
            Login menu
          </div>
        </SwipeableDrawer>
      )}
    </div >
  );
};

export default Header;
