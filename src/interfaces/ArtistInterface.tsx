export default interface ArtistInterface {
	hash: string
	name: string
	stageName: string
	posterUrl: string
	bio: string
	facebookUrl: string
	twitterUrl: string
	youtubeUrl: string
	instagramUrl: string
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
