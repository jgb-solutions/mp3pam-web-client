import React from "react";
import { Link } from "react-router-dom";
import { Home, ViewQuilt } from "@material-ui/icons";
import { withStyles, Theme, createStyles } from "@material-ui/core/styles";
import Routes from "../routes";
import { WithStyles } from "@material-ui/styles";

const styles = (theme: Theme) =>
	createStyles({
		logo: {
			maxWidth: "100%",
			width: "200px"
		},
		link: {
			color: "white",
			display: "flex",
			textDecoration: "none",
			marginBottom: 10,
			fontWeight: "bold"
		},
		linkIcon: {
			fontSize: 15,
			marginRight: 15
		},
		linkText: {
			fontSize: 15
		}
	});

const menu = [
	{
		name: "Home",
		icon: <Home />,
		to: Routes.home
	},
	{
		name: "Browse",
		icon: <ViewQuilt />,
		to: Routes.browse
	}
];

interface Props extends WithStyles<typeof styles> {}

const Left = ({ classes }: Props) => {
	return (
		<>
			<Link to="/">
				<img
					className={classes.logo}
					src="/assets/images/logo-trans-red-white.png"
					alt="MP3 Pam logo"
				/>
			</Link>
			<p>
				{menu.map((menuItem, index) => (
					<Link key={index} to={menuItem.to} className={classes.link}>
						<span className={classes.linkIcon}>{menuItem.icon}</span>
						<span className={classes.linkText}>{menuItem.name}</span>
					</Link>
				))}
			</p>
		</>
	);
};

export default withStyles(styles)(Left);
