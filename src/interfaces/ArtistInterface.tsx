export default interface ArtistInterface {
	hash: string
	name: string
	stage_name: string
	posterUrl: string
	bio: string
	facebook_url: string
	twitter_url: string
	youtube_url: string
	instagram_url: string
	tracks: {
		hash: string
		title: string
		posterUrl: string
	}[]
	albums: {
		hash: string
		title: string
		coverUrl: string
	}[]
}
