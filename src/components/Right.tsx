import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import AlbumIcon from '@material-ui/icons/Album';
import PersonPinCircleIcon from '@material-ui/icons/PersonPinCircle';
import { get } from 'lodash-es';
import Avatar from '@material-ui/core/Avatar';


import Routes from '../routes';
import { menuStyles } from '../styles/menuStyles';
import AppStateInterface from '../interfaces/AppStateInterface';
import { UserData } from '../interfaces/UserInterface';

const CreateMenu = [
  { name: "Add Track", to: Routes.user.create.track, icon: <MusicNoteIcon /> },
  { name: "Add Artist", to: Routes.user.create.artist, icon: <PersonPinCircleIcon /> },
  { name: "Create Album", to: Routes.user.create.album, icon: <AlbumIcon /> },
  // { name: "Create PlayList", to: Routes.user.create.playlist, icon: <PlaylistAddIcon /> },
  // { name: "Add Podcast", to: Routes.user.create.podcast, icon: <MicIcon /> },
];

const libraryMenu = [
  { name: "Tracks", to: Routes.user.manage.tracks, icon: <MusicNoteIcon /> },
  { name: "Artists", to: Routes.user.manage.artists, icon: <PersonPinCircleIcon /> },
  { name: "Albums", to: Routes.user.manage.albums, icon: <AlbumIcon /> },
  // { name: "PlayLists", to: Routes.user.manage.playlists, icon: <PlaylistAddIcon /> },
  // { name: "Podcasts", to: Routes.user.manage.podcasts, icon: <MicIcon /> },
];

type Props = {
  closeDrawerRight?: (bool: boolean) => void,
  user: UserData
};

const Right = (props: Props) => {
  const styles = menuStyles();
  const user = props.user;
  const currentUser = useSelector(({ currentUser }: AppStateInterface) => currentUser);
  const userData = get(currentUser, 'data');

  const closeDrawer = () => {
    if (props.closeDrawerRight) {
      props.closeDrawerRight(false)
    }
  };

  return (
    <>
      {userData ? (
        <div className={styles.container}>
          <div className={styles.menuList}>
            <div className={styles.mainMenu}>
              <NavLink
                activeClassName={styles.activeClassName}
                exact
                to={Routes.user.account}
                className={`${styles.link} ${styles.mainMenuLink}`}
                onClick={closeDrawer}>
                <span className={styles.linkIcon}>
                  <Avatar style={{ width: 20, height: 20 }} alt={user.name} src={user.avatar_url} />
                </span>
                <span className={styles.linkText}>Your Profile</span>
              </NavLink>
            </div>

            <div>
              <p>
                <NavLink
                  activeClassName={styles.activeClassName}
                  exact
                  to={Routes.user.manage.home}
                  className={styles.yourLibraryLink}
                  onClick={closeDrawer}>
                  Manage Your Library
					      </NavLink>
              </p>
              {libraryMenu.map((menuItem, index) => (
                <NavLink
                  activeClassName={styles.activeClassName}
                  exact
                  key={index}
                  to={menuItem.to}
                  className={`${styles.link} ${styles.libraryLink}`}
                  onClick={closeDrawer}>
                  <span className={styles.linkIcon}>{menuItem.icon}</span>
                  <span className={styles.linkText}>{menuItem.name}</span>
                </NavLink>
              ))}

              <br />

              {CreateMenu.map((menuItem, index) => (
                <NavLink
                  activeClassName={styles.activeClassName}
                  exact
                  key={index}
                  to={menuItem.to}
                  className={`${styles.link} ${styles.libraryLink}`}
                  onClick={closeDrawer}>
                  <span className={styles.linkIcon}>{menuItem.icon}</span>
                  <span className={styles.linkText}>{menuItem.name}</span>
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Right;
