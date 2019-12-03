import React, { useEffect } from "react";
import Home from "@material-ui/icons/Home";

import Spinner from '../components/Spinner';
import useHome from "../hooks/useHome";
import HeaderTitle from "../components/HeaderTitle";
import { TrackScrollingList } from "../components/TrackScrollingList";
import { ArtistScrollingList } from "../components/ArtistScrollingList";
import { AlbumScrollingList } from "../components/AlbumScrollingList";
import Routes from "../routes";

export default function HomeScreen() {
	const { loading, error, homeData } = useHome();
	// fetch home data
	useEffect(() => {
		console.log(homeData);
	}, [homeData])

	if (loading) return <Spinner.Full />;

	if (error) return <p>Error Loading new data. Please refresh the page.</p>;

	return (
		<>
			<HeaderTitle icon={<Home />} text="Home" />

			{homeData.latestTracks && (
				<TrackScrollingList
					category="New Tracks"
					tracks={homeData.latestTracks.data}
					browse={Routes.browse.tracks}
				/>
			)}

			{homeData.latestAlbums && (
				<AlbumScrollingList
					category="New Albums"
					albums={homeData.latestAlbums.data}
					browse={Routes.browse.albums}
				/>
			)}

			{homeData.latestArtists && (
				<ArtistScrollingList
					category="New Artists"
					artists={homeData.latestArtists.data}
					browse={Routes.browse.artists}
				/>
			)}
		</>
	);
}
