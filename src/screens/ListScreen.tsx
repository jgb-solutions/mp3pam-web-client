import { connect } from "react-redux";
import React, { useState } from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import { darken, makeStyles } from "@material-ui/core/styles";
import { withRouter, Link, RouteComponentProps } from "react-router-dom";
import { FavoriteBorderRounded, MoreHorizOutlined } from "@material-ui/icons";
import { get } from 'lodash';
import Routes from "../routes";
import colors from "../utils/colors";
import useList from '../hooks/useList';
import Button from "../components/Button";
import ListInterface from "../interfaces/ListInterface";
import * as playerActions from "../store/actions/playerActions";

const useStyles = makeStyles(() => ({
	row: {
		display: "flex",
		flexDirection: "row"
	},
	listCover: {
		width: 220,
		height: 220,
		marginRight: 20,
		"& img": {
			maxWidth: "100%"
		}
	},
	listByAuthor: {
		fontSize: 12
	},
	listBy: {
		color: darken(colors.white, 0.5)
	},
	listAuthor: {
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
	listDetails: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "flex-end",
		"& > *": {
			padding: 0,
			margin: 0
		}
	},
	listType: {
		fontSize: 12,
		fontWeight: 400,
		textTransform: "uppercase"
	},
	listName: {
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
	playList(list: ListInterface): void;
	pauseList(): void;
	resumeList(): void;
	isPlaying: boolean;
	playingListId: string;
}

interface RouteParams {listId: string, listParam: ListInterface}

const ListScreen = (props: Props & RouteComponentProps<any>) => {
	const styles = useStyles();
	const listId = props.match.params.listId
	const listParam = get(props.location.state, 'listParam')
	const [anchorEl, listAnchorEl] = useState(null);
	const [list, isLoading, error] = useList(listId, listParam);

	function handleClick(event: any) {
		listAnchorEl(event.currentTarget);
	}

	function handleClose() {
		listAnchorEl(null);
	}

	const togglePlay = (list: ListInterface) => {
		if (props.isPlaying && props.playingListId === list.id) {
			props.pauseList();
			console.log("pausing list");
		}

		if (!props.isPlaying && props.playingListId === list.id) {
			props.resumeList();
			console.log("resuming list");
		}

		if (props.playingListId !== list.id) {
			props.playList(list);
			console.log("play list");
		}
	};


	if (isLoading) {
		return (<h1>Loading...</h1>)
	}

	if (error) {
		return (<h1>There was an error fetching the list</h1>)
	}

	return list ? (
			<>
				<div className={styles.row}>
					<div className={styles.listCover}>
						<img src={list.image} alt={list.name} />
					</div>
					<div className={styles.listDetails}>
						<h5 className={styles.listType}>{list.type}</h5>
						<h1 className={styles.listName}>{list.name}</h1>
						<p className={styles.listByAuthor}>
							<span className={styles.listBy}>By </span>
							<Link
								to={Routes.goToAuthorDetail("authorId")}
								className={styles.listAuthor}
							>
								Konpa Kreyòl 				{'playing' + props.isPlaying}

							</Link>
						</p>
						<div>
							<Button onClick={() => { togglePlay(list) }}>
								{props.isPlaying ? "Pause" : "Play"}
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
		) : null;
}

export default connect(
	({ player }: any) => ({
		playingListId: player.list.id,
		isPlaying: player.isPlaying
	}),
	{
		playList: playerActions.playList,
		pauseList: playerActions.pauseList,
		resumeList: playerActions.resumeList
	}
)(withRouter(ListScreen));
