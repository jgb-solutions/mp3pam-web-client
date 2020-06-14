export interface SearchData {
  tracks: {
    hash: string
    title: string
    posterUrl: string
    artist: {
      hash: string
      stageName: string
    }
  }[]

  artists: {
    hash: string
    stageName: string
    posterUrl: string
  }[]

  albums: {
    hash: string
    title: string
    coverUrl: string
    artist: {
      hash: string
      stageName: string
    }
  }[]
}

export default interface SearchInterface {
  term: string
  data: SearchData
}