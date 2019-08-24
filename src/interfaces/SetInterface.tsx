import TrackInterface from "./TrackInterface";

export default interface SetInterface {
	id: string;
	items?: TrackInterface[];
	title: string;
	image: string;
	author: string;
}
