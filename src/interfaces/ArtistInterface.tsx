export default interface ArtistInterface {
	hash: string
	name: string
	stage_name: string
	poster_url: string
	bio: string
	facebook_url: string
	twitter_url: string
	youtube_url: string
	instagram_url: string
	tracks: {
		hash: string
		title: string
		poster_url: string
	}[]
	albums: {
		hash: string
		title: string
		cover_url: string
	}[]
}
