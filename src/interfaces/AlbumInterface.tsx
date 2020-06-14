export interface AlbumTrackInterface {
  hash: string
  title: string
  posterUrl: string
  audioUrl: string
  number: number
  playCount: number
  downloadCount: number
}

export interface AlbumPlainInterface {
  id: string
  title: string
  hash: string
  coverUrl: string
  detail: string
  releaseYear: number
}

export default interface AlbumInterface extends AlbumPlainInterface {
  tracks: AlbumTrackInterface[]
  artist: {
    hash: string
    stageName: string
  }
}
