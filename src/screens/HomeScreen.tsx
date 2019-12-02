import React, { useEffect } from "react";
import Home from "@material-ui/icons/Home";

import { TrackScrollingList } from "../components/TrackScrollingList";
import Spinner from '../components/Spinner';
import useHome from "../hooks/useHome";
import HeaderTitle from "../components/HeaderTitle";
import { ArtistScrollingList } from "../components/ArtistScrollingList";

// const categories: string[] = [
// 	"Featured",
// 	"Rap",
// 	"Compas",
// 	"Pop",
// 	"Reggae",
// 	"Roots"
// ];
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
			{/* Latest Tracks */}
			{homeData.latestTracks && (
				<TrackScrollingList
					category="Latest Tracks"
					tracks={homeData.latestTracks.data}
				/>
			)}

			{/* Latest Artists */}
			{homeData.latestArtists && (
				<ArtistScrollingList
					category="Latest Artists"
					artists={homeData.latestArtists.data}
				/>
			)}

			{/* Latest Tracks */}
			{homeData.latestTracks && (
				<TrackScrollingList
					category="Latest Tracks"
					tracks={homeData.latestTracks.data}
				/>
			)}

			{/* Latest Tracks */}
			{homeData.latestTracks && (
				<TrackScrollingList
					category="Latest Tracks"
					tracks={homeData.latestTracks.data}
				/>
			)}
		</>
	);
}
