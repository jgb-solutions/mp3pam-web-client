import React from "react";
import { Link } from "react-router-dom";
import { Home, ViewQuilt } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";

import Routes from "../routes";
import colors from "../utils/colors";
import Logo from "./Logo";

const useStyles = makeStyles({
	link: {
		color: colors.white,
		display: "flex",
		textDecoration: "none",
		fontWeight: "bold"
	},
	libraryLink: {
		marginBottom: 15,
	},
	linkIcon: {
		fontSize: 15,
		marginRight: 15
	},
	linkText: {
		fontSize: 15
	},
	mainMenu: {
		marginBottom: 30
	},
	yourLibraryLink: {
		textDecoration: 'none',
		color: colors.white
	}
});

const mainMenu = [
	{ name: "Home", icon: <Home />, to: Routes.pages.home },
	{ name: "Browse", icon: <ViewQuilt />, to: Routes.pages.browse }
];

const libraryMenu = [
	{ name: "Tracks", to: Routes.user.tracks },
	{ name: "Albums", to: Routes.user.albums },
	{ name: "Artists", to: Routes.user.artists },
	{ name: "Podcasts", to: Routes.user.podcasts },
	{ name: "Queue", to: Routes.user.queue },
];

type Props = {
	closeDrawerLeft?: (bool: boolean) => void,
};

const Left = (props: Props) => {
	const styles = useStyles();
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
		</>
	);
};

export default Left;
