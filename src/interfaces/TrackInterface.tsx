export default interface TrackInterface {
	title: string
	hash: string
	allowDownload: boolean
	audio_url: string
	poster_url: string
	featured: boolean
	detail: string
	lyrics: string
	play_count: number
	download_count: number
	audio_file_size: number
	genre: {
		name: string
		slug: string
	}
	artist: {
		stage_name: string
		hash: string
	}
	album: {
		title: string
		hash: string
	}
}
