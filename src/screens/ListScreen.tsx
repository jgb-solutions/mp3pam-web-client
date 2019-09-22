import { connect } from "react-redux";
import React from "react";
import { darken, makeStyles } from "@material-ui/core/styles";
import { withRouter, Link, RouteComponentProps } from "react-router-dom";
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
}));

interface Props {
	playList(list: ListInterface): void;
	pauseList(): void;
	resumeList(): void;
	isPlaying: boolean;
	playingListId: string;
	currentTime: number;
}

interface RouteParams { listId: string, listParam: ListInterface }

const ListScreen = (props: Props & RouteComponentProps<any>) => {
	const styles = useStyles();
	const listId = props.match.params.listId
	const listParam = get(props.location.state, 'listParam')
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
							{/* todo // using props.currentTime > 0  to display rsesume or replay */}
						</Button>
						<Heart border />
						<More border />
					</div>
				</div>
			</div>
			<br />
			{list.tracks && <ListTable list={list} />}
		</>
	) : null;
}

export default connect(
	({ player }: AppStateInterface) => ({
		playingListId: player.list.id,
		isPlaying: player.isPlaying,
		currentTime: player.currentTime
	}),
	{
		playList: playerActions.playList,
		pauseList: playerActions.pauseList,
		resumeList: playerActions.resumeList
	}
)(withRouter(ListScreen));
