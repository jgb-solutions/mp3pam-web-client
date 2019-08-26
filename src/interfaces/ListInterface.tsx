import TrackInterface from "./TrackInterface";

export default interface ListInterface {
	id: string;
	items?: TrackInterface[];
	name: string;
	image: string;
	author: string;
	type: string;
}
