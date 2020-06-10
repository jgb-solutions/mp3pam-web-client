export interface AlbumTrackInterface {
  hash: string
  title: string
  posterUrl: string
  audio_url: string
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
  release_year: number
}

export default interface AlbumInterface extends AlbumPlainInterface {
  tracks: AlbumTrackInterface[]
  artist: {
    hash: string
    stage_name: string
  }
}
