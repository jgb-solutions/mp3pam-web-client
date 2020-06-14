export default interface TrackInterface {
	title: string
	hash: string
	allowDownload: boolean
	audioUrl: string
	posterUrl: string
	featured: boolean
	detail: string
	lyrics: string
	playCount: number
	downloadCount: number
	audioFileSize: number
	genre: {
		name: string
		slug: string
	}
	artist: {
		stageName: string
		hash: string
	}
	album: {
		title: string
		hash: string
	}
}
