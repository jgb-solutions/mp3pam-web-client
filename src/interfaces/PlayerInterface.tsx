import ListInterface, { SoundInterface } from "./ListInterface";

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
	currentSound?: SoundInterface;
	list?: ListInterface;
	soundList: SoundInterface[];
}
