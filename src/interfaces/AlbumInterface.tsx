export interface AlbumTrackInterface {
  hash: string
  title: string
  poster_url: string
  audio_url: string
  number: number
  play_count: number
  download_count: number
}

export interface AlbumPlainInterface {
  id: string
  title: string
  hash: string
  cover_url: string
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
