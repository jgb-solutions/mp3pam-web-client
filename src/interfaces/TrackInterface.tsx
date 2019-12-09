import CategoryInterface from "./CategoryInterface";
import ArtistInterface from "./ArtistInterface";

export default interface TrackInterface {
	title: string;
	hash: string;
	allowDownload: boolean;
	audio_url: string;
	poster_url: string;
	featured: boolean;
	detail: string;
	lyrics: string;
	genre: {
		name: string;
		slug: string;
	}
	artist: {
		stage_name: string;
		hash: string;
	}
}
