import React from "react"
import Home from "@material-ui/icons/Home"

import Spinner from '../components/Spinner'
import useHome from "../hooks/useHome"
import HeaderTitle from "../components/HeaderTitle"
import { TrackScrollingList } from "../components/TrackScrollingList"
import { ArtistScrollingList } from "../components/ArtistScrollingList"
import { AlbumScrollingList } from "../components/AlbumScrollingList"
import Routes from "../routes"

export default function HomeScreen() {
	const { loading, error, homeData } = useHome()

	if (loading) return <Spinner.Full />

	if (error) return <h1>Error Loading the homepage data. Please refresh the page.</h1>

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
	)
}
