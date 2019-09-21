import ListInterface from "./ListInterface";
import TrackInterface from "./TrackInterface";

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
	updateHack: string,
	currentTrack?: TrackInterface;
	list: ListInterface;
}
