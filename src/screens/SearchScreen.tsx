import React from "react";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";
import ListInterface from "../interfaces/ListInterface";
import * as searchActions from "../store/actions/searchActions";

const SearchScreen = (props: { term: string; results: ListInterface[] }) => {
	const { term, results } = props;
	return (
		<div>
			<h2>Your Search for "{term}"</h2>
			{results.length ? (
				<Grid container spacing={1}>
					{results.map((track, index) => {
						// const image = track.album.images[1];
						// const { url } = image;

						return (
							<Grid key={index} item sm={2} xs={2}>
								{/* <img src={url} style={{ maxWidth: "100%" }} alt="todo" /> */}
							</Grid>
						);
					})}
				</Grid>
			) : null}
		</div>
	);
};

export default connect(
	({ search }: any) => ({
		results: search.results,
		term: search.term
	}),
	{
		search: searchActions
	}
)(SearchScreen);
