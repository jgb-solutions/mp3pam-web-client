import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AccountCircle } from "@material-ui/icons";
import { Link } from "react-router-dom";
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import AlbumIcon from '@material-ui/icons/Album';
import MicIcon from '@material-ui/icons/Mic';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import PersonPinCircleIcon from '@material-ui/icons/PersonPinCircle';
import QueueMusicIcon from '@material-ui/icons/QueueMusic';
import { get } from 'lodash-es';
import { useMutation, useApolloClient } from '@apollo/react-hooks';


import Button from './Button';
import Routes from '../routes';
import { LOG_OUT } from '../store/actions/types';
import { menuStyles } from '../styles/menuStyles';
import AppStateInterface from '../interfaces/AppStateInterface';
import { LOG_OUT_MUTATION } from '../graphql/mutations';

const mainMenu = [
  { name: "Account", icon: <AccountCircle />, to: Routes.user.account },
  // { name: "Upload", icon: <CloudUpload />, to: Routes.pages.upload }
];

const CreateMenu = [
  { name: "Add Track", to: Routes.user.create.track, icon: <MusicNoteIcon /> },
  { name: "Create Album", to: Routes.user.create.album, icon: <AlbumIcon /> },
  { name: "Add Artist", to: Routes.user.create.artist, icon: <PersonPinCircleIcon /> },
  // { name: "Create PlayList", to: Routes.user.create.playlist, icon: <PlaylistAddIcon /> },
  // { name: "Add Podcast", to: Routes.user.create.podcast, icon: <MicIcon /> },
];

const libraryMenu = [
  { name: "Tracks", to: Routes.user.manage.tracks, icon: <MusicNoteIcon /> },
  { name: "Albums", to: Routes.user.manage.albums, icon: <AlbumIcon /> },
  { name: "Artists", to: Routes.user.manage.artists, icon: <PersonPinCircleIcon /> },
  // { name: "PlayLists", to: Routes.user.manage.playlists, icon: <PlaylistAddIcon /> },
  // { name: "Podcasts", to: Routes.user.manage.podcasts, icon: <MicIcon /> },
];

type Props = {
  closeDrawerRight?: (bool: boolean) => void,
};

const Right = (props: Props) => {
  const styles = menuStyles();
  const dispatch = useDispatch();
  const client = useApolloClient();
  const [logOutMutation, { data: logged_out }] = useMutation(LOG_OUT_MUTATION)
  const currentUser = useSelector(({ currentUser }: AppStateInterface) => currentUser);
  const userData = get(currentUser, 'data');

  const closeDrawer = () => {
    if (props.closeDrawerRight) {
      props.closeDrawerRight(false)
    }
  };

  const logout = () => {
    logOutMutation()
  }

  useEffect(() => {
    if (logged_out) {
      client.resetStore();
      dispatch({ type: LOG_OUT })
      closeDrawer();
    }
  }, [logged_out])

  return (
    <>
      {userData ? (
        <div className={styles.container}>
          <div className={styles.menuList}>
            <div className={styles.mainMenu}>
              {mainMenu.map((menuItem, index) => (
                <Link
                  key={index}
                  to={menuItem.to}
                  className={`${styles.link} ${styles.mainMenuLink}`}
                  onClick={closeDrawer}>
                  <span className={styles.linkIcon}>{menuItem.icon}</span>
                  <span className={styles.linkText}>{menuItem.name}</span>
                </Link>
              ))}
            </div>

            <div>
              <p>
                <Link
                  to={Routes.user.manage.home}
                  className={styles.yourLibraryLink}
                  onClick={closeDrawer}>
                  Manage Your Library
					      </Link>
              </p>
              {libraryMenu.map((menuItem, index) => (
                <Link
                  key={index}
                  to={menuItem.to}
                  className={`${styles.link} ${styles.libraryLink}`}
                  onClick={closeDrawer}>
                  <span className={styles.linkIcon}>{menuItem.icon}</span>
                  <span className={styles.linkText}>{menuItem.name}</span>
                </Link>
              ))}

              <br />

              {CreateMenu.map((menuItem, index) => (
                <Link
                  key={index}
                  to={menuItem.to}
                  className={`${styles.link} ${styles.libraryLink}`}
                  onClick={closeDrawer}>
                  <span className={styles.linkIcon}>{menuItem.icon}</span>
                  <span className={styles.linkText}>{menuItem.name}</span>
                </Link>
              ))}
            </div>
          </div>
          <div className={styles.logoutContainer}>
            <Button fullWidth onClick={logout}>Log out</Button>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Right;
