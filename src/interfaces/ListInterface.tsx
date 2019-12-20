
export interface SoundInterface {
	hash: string,
	title: string,
	image: string
	author_name: string
	author_hash: string
	play_url: string
	type: string
}

export default interface ListInterface {
	hash: string
	sounds: SoundInterface[]
}
