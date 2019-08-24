import TrackInterface from "./TrackInterface";

export default interface SetInterface {
	id: string;
	items?: TrackInterface[];
	name: string;
	image: string;
	author: string;
	type: string;
}
