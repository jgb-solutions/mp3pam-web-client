export interface PlaylistTrackInterface {
  hash: string
  title: string
  posterUrl: string
  audio_url: string
  number: number
  play_count: number
  download_count: number
  artist: {
    hash: string
    stage_name: string
  }
}

export interface PlaylistPlainInterface {
  id: string
  title: string
  hash: string
  coverUrl: string
}

export default interface PlaylistInterface extends PlaylistPlainInterface {
  tracks: PlaylistTrackInterface[]
  user: {
    name: string
  }
}
