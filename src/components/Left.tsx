import React from "react";
import { Link } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import AlbumIcon from '@material-ui/icons/Album';
import MicIcon from '@material-ui/icons/Mic';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import PersonPinCircleIcon from '@material-ui/icons/PersonPinCircle';
import InfoIcon from '@material-ui/icons/Info';

import Routes from "../routes";
import Logo from "./Logo";
import { menuStyles } from "../styles/menuStyles";

const mainMenu = [
	{ name: "Home", to: Routes.pages.home, icon: <HomeIcon /> },
	{ name: "About", to: Routes.pages.about, icon: <InfoIcon />, }
];

const browsingMenu = [
	{ name: "Tracks", to: Routes.browse.tracks, icon: <MusicNoteIcon /> },
	{ name: "Albums", to: Routes.browse.albums, icon: <AlbumIcon /> },
	{ name: "Artists", to: Routes.browse.artists, icon: <PersonPinCircleIcon /> },
	{ name: "PlayLists", to: Routes.browse.playlists, icon: <PlaylistAddIcon /> },
	{ name: "Podcasts", to: Routes.browse.podcasts, icon: <MicIcon /> },
];

type Props = {
	closeDrawerLeft?: (bool: boolean) => void,
};

const Left = (props: Props) => {
	const styles = menuStyles();
	const closeDrawer = () => {
		if (props.closeDrawerLeft) {
			props.closeDrawerLeft(false)
		}
	}

	return (
		<>
			<Logo />
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
						to={Routes.pages.browse}
						className={styles.yourLibraryLink}
						onClick={closeDrawer}>
						Browse
					</Link>
				</p>
				{browsingMenu.map((menuItem, index) => (
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
		</>
	);
};

export default Left;
