import SetInterface from "./SetInterface";
import TrackInterface from "./TrackInterface";
import ArtistInterface from "./ArtistInterface";
import CategoryInterface from "./CategoryInterface";

export default interface PlayerInterface {
	volume: number;
	repeat: string;
	isPlaying: boolean;
	isShuffled: boolean;
	action: string;
	position: number;
	elapsed: string;
	duration: string;
	currentTime: number;
	currentTrack: TrackInterface;
	set: SetInterface;
}
