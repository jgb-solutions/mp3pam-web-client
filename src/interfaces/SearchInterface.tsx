export interface SearchData {
  tracks: {
    hash: string
    title: string
    posterUrl: string
    artist: {
      hash: string
      stage_name: string
    }
  }[]

  artists: {
    hash: string
    stage_name: string
    posterUrl: string
  }[]

  albums: {
    hash: string
    title: string
    coverUrl: string
    artist: {
      hash: string
      stage_name: string
    }
  }[]
}

export default interface SearchInterface {
  term: string
  data: SearchData
}