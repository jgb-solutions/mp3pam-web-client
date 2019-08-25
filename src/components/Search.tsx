import React, { useState, useEffect } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import { connect } from "react-redux";
import * as searchActions from "../store/actions/searchActions";
import { withRouter, RouteComponentProps } from "react-router-dom";

const useStyles = makeStyles(theme => ({
	search: {
		position: "relative",
		borderRadius: 25,
		backgroundColor: fade(theme.palette.common.white, 0.95),
		"&:hover": {
			backgroundColor: fade(theme.palette.common.white, 0.99)
		},
		color: fade(theme.palette.common.black, 0.8),
		// marginRight: theme.spacing(2),
		marginLeft: 0
		// width: '100%'
	},
	searchIcon: {
		width: theme.spacing(7),
		height: "100%",
		position: "absolute",
		pointerEvents: "none",
		display: "flex",
		alignItems: "center",
		justifyContent: "center"
	},
	inputRoot: {
		color: "inherit"
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 7),
		transition: theme.transitions.create("width"),
		width: "100%",
		[theme.breakpoints.up("md")]: {
			width: 200
		}
	}
}));

const Search = (
	props: {
		search(term: string): void;
		term: string;
	} & RouteComponentProps
) => {
	const { history, search, term } = props;
	const classes = useStyles();
	const [searchTerm, setSearchTerm] = useState(term);

	useEffect(() => {
		updateSearchUrl();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchTerm]);

	const handleChange = (event: any) => {
		const text = event.target.value;
		setSearchTerm(text);
		search(text);
	};

	const updateSearchUrl = (isClicked = false) => {
		if (searchTerm.length || isClicked) {
			history.push({
				pathname: "/search",
				search: searchTerm.length ? `?query=${searchTerm}` : ""
			});
		} else {
			history.push({
				search: ""
			});
		}
	};

	return (
		<div className={classes.search}>
			<div className={classes.searchIcon}>
				<SearchIcon />
			</div>
			<InputBase
				placeholder="Search…"
				classes={{
					root: classes.inputRoot,
					input: classes.inputInput
				}}
				inputProps={{ "aria-label": "Search" }}
				onClick={() => updateSearchUrl(true)}
				onChange={handleChange}
				value={searchTerm}
			/>
		</div>
	);
};

export default connect(
	({ search }: any) => ({
		term: search.term
	}),
	{
		search: searchActions.search
	}
)(withRouter(Search));
