export interface AlbumTrackInterface {
  hash: string
  title: string
  poster_url: string
  audio_url: string
  number: number
  play_count: number
  download_count: number
}

export default interface AlbumInterface {
  title: string
  hash: string
  cover_url: string
  detail: string
  release_year: number
  tracks: AlbumTrackInterface[]
  artist: {
    hash: string
    stage_name: string
  }
}
