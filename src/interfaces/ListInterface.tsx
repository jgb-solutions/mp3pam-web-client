
export interface SoundInterface {
	hash: string,
	title: string,
	image: string
	authorName: string
	authorHash: string
	playUrl: string
	type: string
}

export default interface ListInterface {
	hash: string
	sounds: SoundInterface[]
}
