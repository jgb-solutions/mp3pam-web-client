import SetInterface from "./SetInterface";
import TrackInterface from "./TrackInterface";
import ArtistInterface from "./ArtistInterface";
import CategoryInterface from "./CategoryInterface";

export default interface PlayerInterface {
	volume: number;
	repeat: string;
	isPlaying: boolean;
	currentTrack: TrackInterface;
	isShuffled: boolean;
	playedTracks: Array<TrackInterface>;
	action: string;
	set: SetInterface;
	position: number;
	elapsed: string;
	duration: string;
	currentTime: number;
	artist: ArtistInterface;
	category: CategoryInterface;
	title: string;
	detail: string;
	lyrics: string;
	url: string;
	play_count: 0;
	play_url: string;
	download_count: 0;
	download_url: string;
	image: string;
	favorite: boolean;
}
