import React from "react"
import { NavLink } from "react-router-dom"
import HomeIcon from "@material-ui/icons/Home"
import MusicNoteIcon from '@material-ui/icons/MusicNote'
import AlbumIcon from '@material-ui/icons/Album'
import PersonPinCircleIcon from '@material-ui/icons/PersonPinCircle'
import InfoIcon from '@material-ui/icons/Info'
import QueueMusicIcon from '@material-ui/icons/QueueMusic'

import Routes from "../routes"
import Logo from "./Logo"
import { menuStyles } from "../styles/menuStyles"

const mainMenu = [
	{ name: "Home", to: Routes.pages.home, icon: <HomeIcon /> },
	{ name: "About", to: Routes.pages.about, icon: <InfoIcon />, }
]

const browsingMenu = [
	{ name: "Tracks", to: Routes.browse.tracks, icon: <MusicNoteIcon /> },
	{ name: "Artists", to: Routes.browse.artists, icon: <PersonPinCircleIcon /> },
	{ name: "Albums", to: Routes.browse.albums, icon: <AlbumIcon /> },
	// { name: "PlayLists", to: Routes.browse.playlists, icon: <PlaylistAddIcon /> },
	// { name: "Podcasts", to: Routes.browse.podcasts, icon: <MicIcon /> },
]

const favoriteMenu = [
	// { name: "Tracks", to: Routes.user.library.tracks, icon: <MusicNoteIcon /> },
	// { name: "Artists", to: Routes.user.library.artists, icon: <PersonPinCircleIcon /> },
	// { name: "Albums", to: Routes.user.library.albums, icon: <AlbumIcon /> },
	// { name: "PlayLists", to: Routes.user.library.playlists, icon: <PlaylistAddIcon /> },
	// { name: "Podcasts", to: Routes.user.library.podcasts, icon: <MicIcon /> },
	{ name: "Queue", to: Routes.user.library.queue, icon: <QueueMusicIcon /> },
]

type Props = {
	closeDrawerLeft?: (bool: boolean) => void,
}

const Left = (props: Props) => {
	const styles = menuStyles()
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
					<NavLink
						activeClassName={styles.activeClassName}
						exact
						key={index}
						to={menuItem.to}
						className={`${styles.link} ${styles.mainMenuLink}`}
						onClick={closeDrawer}>
						<span className={styles.linkIcon}>{menuItem.icon}</span>
						<span className={styles.linkText}>{menuItem.name}</span>
					</NavLink>
				))}
			</div>

			{/* Browse Menu */}
			<div className={styles.browseMenu}>
				<p>
					<NavLink
						activeClassName={styles.activeClassName}
						exact
						to={Routes.pages.browse}
						className={styles.yourLibraryLink}
						onClick={closeDrawer}>
						Browse
					</NavLink>
				</p>
				{browsingMenu.map((menuItem, index) => (
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

			{/* Favorite Menu */}
			<div>
				{/* <p>
					<NavLink
						activeClassName={styles.activeClassName}
						exact
						to={Routes.pages.library}
						className={styles.yourLibraryLink}
						onClick={closeDrawer}>
						What You Like
					</NavLink>
				</p> */}
				{favoriteMenu.map((menuItem, index) => (
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
		</>
	)
}

export default Left
