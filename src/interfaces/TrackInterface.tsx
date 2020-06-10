export default interface TrackInterface {
	title: string
	hash: string
	allowDownload: boolean
	audio_url: string
	posterUrl: string
	featured: boolean
	detail: string
	lyrics: string
	playCount: number
	downloadCount: number
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
