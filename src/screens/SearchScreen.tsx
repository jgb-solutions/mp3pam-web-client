import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import { get } from "lodash-es";
import { Grid } from "@material-ui/core";

import ListInterface from "../interfaces/ListInterface";
import * as searchActions from "../store/actions/searchActions";
import AppStateInterface from "../interfaces/AppStateInterface";
import useSearch from '../hooks/useSearch';
import Spinner from "../components/Spinner";
import HeaderTitle from "../components/HeaderTitle";
import { TrackWithArtistThumbnailData } from "../components/TrackScrollingList";
import TrackThumbnail from "../components/TrackThumbnail";
import { SearchData } from "../interfaces/SearchInterface";
import { debounce } from "../utils/helpers";
let syncStateTimeoutId: number;

export default function SearchScreen() {
	const dispatch = useDispatch();
	const { search, data: resultData, loading, error } = useSearch()
	const { term, data: storeData } = useSelector(({ search }: AppStateInterface) => search);
	const [state, setState] = useState<SearchData>(storeData);

	// fetch home data
	useEffect(() => {
		if (resultData) {
			if (
				resultData.tracks.length ||
				resultData.artists.length ||
				resultData.albums.length
			) {
				setState(resultData);
			}
		}
	}, [resultData])

	useEffect(() => {
		console.log(term)
		if (term.trim().length >= 2) {
			clearTimeout(syncStateTimeoutId);
			debounce(() => {
				search(term);
			}, 500, syncStateTimeoutId);
		}
	}, [term])

	if (loading) return <Spinner.Full />;

	if (error) return <p>Error Loading new data. Please refresh the page.</p>;

	return (
		<>
			{state.tracks.length ? (
				<>
					<HeaderTitle icon={<MusicNoteIcon />} text="Browse Tracks" />
					<Grid container spacing={2}>
						{state.tracks.map((track: TrackWithArtistThumbnailData) => (
							<Grid item xs={4} md={3} sm={4} key={track.hash}>
								<TrackThumbnail track={track} />
							</Grid>
						))}
					</Grid>
				</>
			) : null}
		</>
	);
};
