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
});

const mainMenu = [
	{ name: "Home", icon: <Home />, to: Routes.pages.home },
	{ name: "Browse", icon: <ViewQuilt />, to: Routes.pages.browse }
];

const libraryMenu = [
	{ name: "Tracks", to: Routes.browse.tracks },
	{ name: "Albums", to: Routes.browse.albums },
	{ name: "Artists", to: Routes.browse.artists },
	{ name: "Podcasts", to: Routes.browse.podcasts },
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
