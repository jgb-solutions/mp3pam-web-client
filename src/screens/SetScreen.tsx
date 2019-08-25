import { connect } from "react-redux";
import React, { useState } from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import { darken, makeStyles } from "@material-ui/core/styles";
import { withRouter, Link, RouteComponentProps } from "react-router-dom";
import { FavoriteBorderRounded, MoreHorizOutlined } from "@material-ui/icons";

import Routes from "../routes";
import colors from "../utils/colors";
import Button from "../components/Button";
import useGetSet from '../hooks/useGetSet';
import ListInterface from "../interfaces/ListInterface";
import * as playerActions from "../store/actions/playerActions";

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
	playSet(list: ListInterface): void;
	pauseList(): void;
	resumeList(): void;
	isPlaying: boolean;
	listId: string;
	set: ListInterface;
}

interface RouteParams {listId?: string, set?: ListInterface}

const SetScreen = (props: Props & RouteComponentProps<any>) => {
	const styles = useStyles();
	const [anchorEl, setAnchorEl] = useState(null);
	const listParam = props.location.state
	const [list, isLoading] = useGetSet(
		props.match.params.listId,
		props.location.state.set
	);

	function handleClick(event: any) {
		setAnchorEl(event.currentTarget);
	}

	function handleClose() {
		setAnchorEl(null);
	}

	const togglePlay = () => {
		if (props.isPlaying && props.listId === list.id) {
			props.pauseList();
			console.log("pausing set");
		}

		if (!props.isPlaying && props.listId === list.id) {
			props.resumeList();
			console.log("resuming set");
		}

		if (props.listId !== list.id) {
			props.playSet(list);
			console.log("play set");
		}
	};


	if (isLoading) {
		return (<h1>Loading...</h1>)
	}

	return (
		<>
			<div className={styles.row}>
				<div className={styles.setCover}>
					<img src={list.image} alt={list.name} />
				</div>
				<div className={styles.setDetails}>
					<h5 className={styles.setType}>{list.type}</h5>
					<h1 className={styles.setName}>{list.name}</h1>
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
							{props.isPlaying && props.listId === list.id ? "Pause" : "Play"}
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
		listId: player.list.id,
		isPlaying: player.isPlaying
	}),
	{
		playSet: playerActions.playList,
		pauseList: playerActions.pauseList,
		resumeList: playerActions.resumeList
	}
)(withRouter(SetScreen));
