import { connect } from "react-redux";
import React from "react";
import { darken, makeStyles } from "@material-ui/core/styles";
import { useHistory, Link, useRouteMatch, useLocation } from "react-router-dom";
import { get } from 'lodash';

import Routes from "../routes";
import colors from "../utils/colors";
import More from "../components/More";
import useList from '../hooks/useList';
import Heart from "../components/Heart";
import Button from "../components/Button";
import ListTable from '../components/ListTable';
import ListInterface from "../interfaces/ListInterface";
import * as playerActions from "../store/actions/playerActions";
import AppStateInterface from "../interfaces/AppStateInterface";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	row: {
		display: "flex",
		flexDirection: "row"
	},
	imageContainer: {
		textAlign: 'center',
	},
	image: {
		width: 250,
		height: 'auto',
		maxWidth: "100%",
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
		// display: "flex",
		// flexDirection: "column",
		// justifyContent: "flex-end",
		[theme.breakpoints.up('xs')]: {
			justifySelf: 'flex-end'
		},
		"& > *": {
			padding: 0,
			margin: 0
		},
		[theme.breakpoints.down('xs')]: {
			textAlign: 'center',
		},
	},
	listType: {
		fontSize: 12,
		fontWeight: 400,
		textTransform: "uppercase"
	},
	listName: {
		fontSize: 48,
		fontWeight: "bold",
		[theme.breakpoints.down('xs')]: {
			fontSize: 32,
		},
	},
	ctaButtons: {
		marginTop: 10,
	},
	hearMore: {
		alignSelf: 'flex-start',
		[theme.breakpoints.down('xs')]: {
			marginTop: 10,
		},
	}
}));

type Props = {
	playList(list: ListInterface): void;
	pauseList(): void;
	resumeList(): void;
	isPlaying: boolean;
	playingListId: string;
	currentTime: number;
};

const ListScreen = (props: Props) => {
	const styles = useStyles();
	const match = useRouteMatch();
	const location = useLocation();
	const listId = get(match, 'params.listId')
	const listParam = get(location.state, 'listParam')
	const [list, isLoading, error] = useList(listId, listParam);

	const togglePlay = (list: ListInterface) => {
		if (props.isPlaying && props.playingListId === list.id) {
			props.pauseList();
		}

		if (!props.isPlaying && props.playingListId === list.id) {
			props.resumeList();
		}

		if (props.playingListId !== list.id) {
			props.playList(list);
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
			<Grid container spacing={2}>
				<Grid item sm={4} xs={12} className={styles.imageContainer}>
					<img src={list.image} alt={list.name} className={styles.image} />
				</Grid>
				<Grid item sm={8} xs={12}>
					<div className={styles.listDetails}>
						<h5 className={styles.listType}>{list.type}</h5>
						<h1 className={styles.listName}>{list.name}</h1>
						<p className={styles.listByAuthor}>
							<span className={styles.listBy}>By </span>
							<Link
								to={Routes.podcast.goToAuthorDetail("authorId")}
								className={styles.listAuthor}
							>
								{list.author}
							</Link>
						</p>
						<Grid className={styles.ctaButtons} container>
							<Grid item sm={4} xs={12}>
								<Button onClick={() => { togglePlay(list) }}>
									{(props.playingListId !== list.id) && "Play"}
									{(props.isPlaying && props.playingListId === list.id) && "Pause"}
									{(!props.isPlaying && props.playingListId === list.id) && "Resume"}
									{/* todo // using props.currentTime > 0  to display rsesume or replay */}
								</Button>
							</Grid>
							<Grid item sm={8} xs={12} className={styles.hearMore}>
								<Heart border />
								&nbsp; &nbsp;
								<More border />
							</Grid>
						</Grid>
					</div>
				</Grid>
			</Grid>
			{/* <div className={styles.row}>
				<div className={styles.listCover}>
					<img src={list.image} alt={list.name} />
				</div>
				<div className={styles.listDetails}>
					<h5 className={styles.listType}>{list.type}</h5>
					<h1 className={styles.listName}>{list.name}</h1>
					<p className={styles.listByAuthor}>
						<span className={styles.listBy}>By </span>
						<Link
							to={Routes.podcast.goToAuthorDetail("authorId")}
							className={styles.listAuthor}
						>
							{list.author}
						</Link>
					</p>
					<div>
						<Button onClick={() => { togglePlay(list) }}>
							{(props.playingListId !== list.id) && "Play"}
							{(props.isPlaying && props.playingListId === list.id) && "Pause"}
							{(!props.isPlaying && props.playingListId === list.id) && "Resume"}
						</Button>
						<Heart border />
						<More border />
					</div>
				</div>
			</div> */}
			<br />
			{list.tracks && <ListTable list={list} />}
		</>
	) : null;
}

export default connect(
	({ player }: AppStateInterface) => ({
		playingListId: get(player, 'list.id'),
		isPlaying: player.isPlaying,
		currentTime: player.currentTime
	}),
	{
		playList: playerActions.playList,
		pauseList: playerActions.pauseList,
		resumeList: playerActions.resumeList
	}
)(ListScreen);
