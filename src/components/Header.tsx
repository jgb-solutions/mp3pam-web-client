import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';

import Left from './Left';
import colors from '../utils/colors';
import Search from './Search';
import { SMALL_SCREEN_SIZE } from '../utils/constants';
import Routes from '../routes';
import AppStateInterface from '../interfaces/AppStateInterface';
import { useSelector } from 'react-redux';
import Right from './Right';

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
  },
  avatar: {
    cursor: 'pointer'
  }
}));

type Props = {};

const Header = (props: Props) => {
  const styles = useStyles();
  const [drawerLeftOPen, setDrawerLeftOpen] = useState(false);
  const [drawerRightOPen, setDrawerRightOpen] = useState(false);
  const currentUser = useSelector(({ currentUser }: AppStateInterface) => currentUser);
  const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

  return (
    <div className={styles.grow}>
      <AppBar className={styles.appBar}>
        <Toolbar className={styles.toolbar}>
          <IconButton
            aria-label="Open left menu"
            onClick={() => setDrawerLeftOpen(true)}
            color="inherit"
            className={styles.leftMenuIcon}>
            <MenuIcon />
          </IconButton>
          <Search />
          <div className={styles.grow} />
          <div className={styles.accountButton}>
            {
              currentUser.loggedIn && currentUser.data ? (
                <Avatar onClick={() => setDrawerRightOpen(true)} alt={currentUser.data.name} src={currentUser.data.avatar} className={styles.avatar} />
                // <IconButton
                //   aria-label="Account"
                //   onClick={() => setDrawerRightOpen(true)}
                //   color="inherit"
                //   className={styles.moreIcon}>
                //   <AccountCircle />
                // </IconButton>

              ) : (
                  <Link to={Routes.pages.login}
                    className={styles.loginButton}
                  >
                    <IconButton
                      aria-label="Login"
                      color="inherit"
                      className={styles.moreIcon}>
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
        <div className={styles.drawer}>
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
          <div className={styles.drawer}>
            <Right closeDrawerRight={setDrawerRightOpen} />
          </div>
        </SwipeableDrawer>
      )}
    </div >
  );
};

export default Header;
