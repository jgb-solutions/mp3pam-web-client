export interface PlaylistTrackInterface {
  hash: string
  title: string
  posterUrl: string
  audioUrl: string
  number: number
  playCount: number
  downloadCount: number
  artist: {
    hash: string
    stageName: string
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
