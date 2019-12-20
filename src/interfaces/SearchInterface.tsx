export interface SearchData {
  tracks: {
    hash: string
    title: string
    poster_url: string
    artist: {
      hash: string
      stage_name: string
    }
  }[]

  artists: {
    hash: string
    stage_name: string
    poster_url: string
  }[]

  albums: {
    hash: string
    title: string
    cover_url: string
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