import ListInterface from "./ListInterface";
import TrackInterface from "./TrackInterface";
import ArtistInterface from "./ArtistInterface";
import CategoryInterface from "./CategoryInterface";

export default interface PlayerInterface {
	volume: number;
	repeat: string | undefined;
	isPlaying: boolean;
	isShuffled: boolean;
	action: string;
	position: number;
	elapsed: string;
	duration: string;
	currentTime: number;
	currentTrack: TrackInterface;
	list: ListInterface;
}
