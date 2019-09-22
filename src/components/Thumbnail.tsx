import React from "react";
import {
	PlayCircleOutline,
	PauseCircleOutline
} from "@material-ui/icons";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { connect } from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";

import colors from "../utils/colors";
import Routes from "../routes";
import ListInterface from "../interfaces/ListInterface";
import { get } from "lodash-es";
import { SMALL_SCREEN_SIZE } from "../utils/constants";

const useStyles = makeStyles(theme => ({
	imgContainer: {
		backgroundSize: "contain",
		cursor: "pointer",
		width: 175,
		height: 175,
		position: "relative",
		marginBottom: 10,
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		[theme.breakpoints.down(SMALL_SCREEN_SIZE)]: {
			width: 100,
			height: 100,
		},
	},
	transparentBackground: {
		opacity: 0,
		position: "absolute",
		backgroundColor: "#000",
		width: "100%",
		height: "100%",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		"&:hover": {
			opacity: 0.7
		}
	},
	icon: {
		fontSize: 75,
		color: colors.white,
		"&:hover": {
			fontSize: 80,
			opacity: 1
		}
	},
	title: {
		margin: 0,
		fontSize: 14,
		color: colors.white
	},
	details: {
		fontSize: 13,
		color: "#9d9d9d",
		marginTop: 5,
		marginBottom: 0
	}
}));

const Thumbnail = (
	props: RouteComponentProps & {
		list: ListInterface;
		className: string;
		isPlaying: boolean;
		listId: string
	}
) => {
	const styles: any = useStyles();

	const { list, listId, isPlaying } = props;
	const goToDetailPage = (list: ListInterface) => {
		const route = get(Routes, list.type).detailPage(list)
		props.history.push(route, { listParam: list });
	};

	return (
		<div className={props.className}>
			<div
				className={styles.imgContainer}
				style={{ backgroundImage: `url(${list.image})` }}
			>
				<div
					className={styles.transparentBackground}
					onClick={() => goToDetailPage(list)}
				>
					<IconButton className={styles.playPauseButton}>
						{(isPlaying && listId === list.id) && (
							<PauseCircleOutline className={styles.icon} />
						)}
						{(!isPlaying || (isPlaying && listId !== list.id)) && (
							<PlayCircleOutline className={styles.icon} />
						)}
					</IconButton>
				</div>
			</div>
			<h3 className={styles.title}>{list.name}</h3>
			<p className={styles.details}>
				Drift away with child <br />
				ambient music. <br />
			</p>
		</div>
	);
};

export default connect(({ player }: any) => ({
	listId: player.list.id,
	isPlaying: player.isPlaying
}))(withRouter(Thumbnail));
