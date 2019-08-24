import { FavoriteBorderRounded, MoreHorizOutlined } from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import React, { useState } from "react";
import {
	darken,
	Theme,
	createStyles,
	withStyles,
	makeStyles
} from "@material-ui/core/styles";
import { withRouter, Link, RouteComponentProps } from "react-router-dom";
import { connect } from "react-redux";
import { WithStyles } from "@material-ui/styles";

import * as playerActions from "../store/actions/playerActions";
import colors from "../utils/colors";
import Routes from "../routes";
import Button from "../components/Button";
import SetInterface from "../interfaces/SetInterface";

const useStyles = makeStyles(() => ({
	row: {
		display: "flex",
		flexDirection: "row"
	},
	setCover: {
		width: 220,
		height: 220,
		marginRight: 20,
		"& img": {
			maxWidth: "100%"
		}
	},
	setByAuthor: {
		fontSize: 12
	},
	setBy: {
		color: darken(colors.white, 0.5)
	},
	setAuthor: {
		textDecoration: "none",
		color: colors.white,
		"&:hover": {
			textDecoration: "underline"
		},
		"&:link": {
			textDecoration: "none",
			color: "white"
		}
	},
	setDetails: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "flex-end",
		"& > *": {
			padding: 0,
			margin: 0
		}
	},
	setType: {
		fontSize: 12,
		fontWeight: 400,
		textTransform: "uppercase"
	},
	setName: {
		fontSize: 48,
		fontWeight: "bold"
	},
	iconBtn: {},
	icon: {
		color: colors.white,
		fontSize: 30,
		padding: 5,
		border: "1px solid white",
		borderRadius: "50%"
	}
}));

interface Props {
	playSet(set: SetInterface): void;
	pauseSet(): void;
	resumeSet(): void;
	isPlaying: boolean;
	setID: string;
	set: SetInterface;
}

const SetScreen = (props: Props & RouteComponentProps) => {
	const [anchorEl, setAnchorEl] = useState(null);
	const { set } = props;
	const styles = useStyles();

	function handleClick(event: any) {
		setAnchorEl(event.currentTarget);
	}

	function handleClose() {
		setAnchorEl(null);
	}

	const togglePlay = () => {
		if (props.isPlaying && props.setID === set.id) {
			props.pauseSet();
			console.log("pausing set");
		}

		if (!props.isPlaying && props.setID === set.id) {
			props.resumeSet();
			console.log("resuming set");
		}

		if (props.setID !== set.id) {
			props.playSet(set);
			console.log("play set");
		}
	};

	return (
		<>
			<div className={styles.row}>
				<div className={styles.setCover}>
					<img src={set.image} alt={set.name} />
				</div>
				<div className={styles.setDetails}>
					<h5 className={styles.setType}>{set.type}</h5>
					<h1 className={styles.setName}>{set.name}</h1>
					<p className={styles.setByAuthor}>
						<span className={styles.setBy}>By </span>
						<Link
							to={Routes.goToAuthorDetail("authorId")}
							className={styles.setAuthor}
						>
							Konpa Kreyòl
						</Link>
					</p>
					<div>
						<Button onClick={togglePlay}>
							{props.isPlaying && props.setID === set.id ? "Pause" : "Play"}
						</Button>
						<IconButton className={styles.iconBtn}>
							<FavoriteBorderRounded className={styles.icon} />
						</IconButton>
						<IconButton
							aria-controls="simple-menu"
							aria-haspopup="true"
							onClick={handleClick}
						>
							<MoreHorizOutlined className={styles.icon} />
						</IconButton>
						<Menu
							id="simple-menu"
							anchorEl={anchorEl}
							keepMounted
							open={Boolean(anchorEl)}
							onClose={handleClose}
						>
							<MenuItem onClick={handleClose}>Profile</MenuItem>
							<MenuItem onClick={handleClose}>My account</MenuItem>
							<MenuItem onClick={handleClose}>Logout</MenuItem>
						</Menu>
					</div>
				</div>
			</div>
		</>
	);
};

export default connect(
	({ player }: any) => ({
		setID: player.set.id,
		isPlaying: player.isPlaying
	}),
	{
		playSet: playerActions.playSet,
		pauseSet: playerActions.pauseSet,
		resumeSet: playerActions.resumeSet
	}
)(withRouter(SetScreen));
