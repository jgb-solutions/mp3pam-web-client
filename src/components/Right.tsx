import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from 'react-redux';
import { CloudUpload, AccountCircle } from "@material-ui/icons";
import { Link } from "react-router-dom";

import AppStateInterface from '../interfaces/AppStateInterface';
import colors from '../utils/colors';
import Button from './Button';
import { LOG_OUT } from '../store/actions/types';
import { get } from 'lodash-es';
import { Avatar } from '@material-ui/core';
import Routes from '../routes';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    color: colors.white,
    height: '100%',
    paddingBottom: 10,
  },
  menuList: {
    height: '100%',
  },
  mainMenu: {
    marginBottom: 30
  },
  yourLibraryLink: {
    textDecoration: 'none',
    color: colors.white
  },
  link: {
    color: colors.white,
    display: "flex",
    textDecoration: "none",
    fontWeight: "bold"
  },
  linkIcon: {
    fontSize: 15,
    marginRight: 15
  },
  linkText: {
    fontSize: 15
  },
  libraryLink: {
    marginBottom: 15,
  },
  logout: {
    alignSelf: 'flex-end',
  }
}));

const mainMenu = [
  { name: "Account", icon: <AccountCircle />, to: Routes.user.account },
  { name: "Upload", icon: <CloudUpload />, to: Routes.pages.upload }
];

const libraryMenu = [
  { name: "Tracks", to: Routes.user.tracks },
  { name: "Albums", to: Routes.user.albums },
  { name: "Artists", to: Routes.user.artists },
  { name: "Podcasts", to: Routes.user.podcasts },
  { name: "Queue", to: Routes.user.queue },
];

type Props = {
  closeDrawerRight?: (bool: boolean) => void,
};

const Right = (props: Props) => {
  const styles = useStyles();
  const dispatch = useDispatch()
  const currentUser = useSelector(({ currentUser }: AppStateInterface) => currentUser);
  const userData = get(currentUser, 'data');

  const closeDrawer = () => {
    if (props.closeDrawerRight) {
      props.closeDrawerRight(false)
    }
  };

  const logout = () => {
    dispatch({ type: LOG_OUT })
    closeDrawer();
  }

  return userData ? (
    <div className={styles.container}>
      <div className={styles.menuList}>
        <div className={styles.mainMenu}>
          {mainMenu.map((menuItem, index) => (
            <Link
              key={index}
              to={menuItem.to}
              className={styles.link}
              onClick={closeDrawer}>
              <span className={styles.linkIcon}>{menuItem.icon}</span>
              <span className={styles.linkText}>{menuItem.name}</span>
            </Link>
          ))}
        </div>
        <div>
          <p>
            <Link
              to={Routes.pages.library}
              className={styles.yourLibraryLink}
              onClick={closeDrawer}>
              Your Library
					</Link>
          </p>
          {libraryMenu.map((menuItem, index) => (
            <Link
              key={index}
              to={menuItem.to}
              className={`${styles.link} ${styles.libraryLink}`}
              onClick={closeDrawer}>
              <span className={styles.linkText}>{menuItem.name}</span>
            </Link>
          ))}
        </div>
      </div>
      <Button fullWidth className={styles.logout} onClick={logout}>Log out</Button>
    </div>
  ) : null;
};

export default Right;
