import React from "react";
import { Link } from "react-router-dom";
import { Home, ViewQuilt } from "@material-ui/icons";
import { withStyles, Theme, createStyles } from "@material-ui/core/styles";
import Routes from "../routes";
import { WithStyles, makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
	logo: {
		maxWidth: "100%",
		width: "200px",
	},
	logoLink: {
		marginBottom: 20,
		display: 'inline-block',
	},
	link: {
		color: "white",
		display: "flex",
		textDecoration: "none",
		marginBottom: 15,
		fontWeight: "bold"
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
	yourLibary: {},
});

const mainMenu = [
	{ name: "Home", icon: <Home />, to: Routes.pages.home },
	{ name: "Browse", icon: <ViewQuilt />, to: Routes.pages.browse }
];

const libraryMenu = [
	{ name: "Liked Tracks", to: Routes.user.favorites },
	{ name: "Albums", to: Routes.user.favoriteAlbums },
	{ name: "Artists", to: Routes.user.favoriteArtists },
	{ name: "Podcasts", to: Routes.user.favoritePodcasts },
	{ name: "Queue", to: Routes.pages.queue },
];

type Props = {
	setDrawerOpen?: (bool: boolean) => void,
};

const Left = (props: Props) => {
	const classes = useStyles();
	const closeDrawer = () => {
		if (props.setDrawerOpen) {
			props.setDrawerOpen(false)
		}
	}

	return (
		<>
			<Link to="/" className={classes.logoLink}>
				<img
					className={classes.logo}
					src="/assets/images/logo-trans-red-white.png"
					alt="MP3 Pam logo"
				/>
			</Link>
			<div className={classes.mainMenu}>
				{mainMenu.map((menuItem, index) => (
					<Link
						key={index}
						to={menuItem.to}
						className={classes.link}
						onClick={closeDrawer}>
						<span className={classes.linkIcon}>{menuItem.icon}</span>
						<span className={classes.linkText}>{menuItem.name}</span>
					</Link>
				))}
			</div>
			<div className={classes.yourLibary}>
				<h5>Your Library</h5>
				{libraryMenu.map((menuItem, index) => (
					<Link
						key={index}
						to={menuItem.to}
						className={classes.link}
						onClick={closeDrawer}>
						<span className={classes.linkText}>{menuItem.name}</span>
					</Link>
				))}
			</div>
		</>
	);
};

export default Left;
