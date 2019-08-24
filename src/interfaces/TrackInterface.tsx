import CategoryInterface from "./CategoryInterface";
import ArtistInterface from "./ArtistInterface";

export default interface TrackInterface {
	url: string;
	title: string;
	image: string;
	detail: string;
	lyrics: string;
	play_url: string;
	favorite: boolean;
	play_count: number;
	download_url: string;
	download_count: number;
	artist: ArtistInterface;
	category: CategoryInterface;
}
