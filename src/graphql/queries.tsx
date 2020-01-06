import gql from 'graphql-tag'

export const FETCH_HOME = gql`
  query homePageData($page: Int, $take: Int, $orderBy: [OrderByClause!]) {
    # Latest 10 tracks
    latestTracks: tracks(take: $take, page: $page, orderBy: $orderBy) {
      data {
        hash
        title
        poster_url
        artist {
          stage_name
          hash
        }
      }
    }

    # Latest 10 playlists
    latestPlaylists: playlists(take: $take, page: $page, orderBy: $orderBy) {
      data {
        hash
        title
        cover_url
      }
    }

    # latest 1o artists
    latestArtists: artists(take: $take, orderBy: $orderBy) {
      data {
        stage_name
        hash
        poster_url
      }
    }

    # latest 1o albums
    latestAlbums: albums(take: $take, orderBy: $orderBy) {
      data {
        title
        hash
        cover_url
        artist {
          stage_name
          hash
          poster_url
        }
      }
    }
  }
`

export const FETCH_MANAGE_SCREEN = gql`
  query managePageData($page: Int, $take: Int) {
    me {
      latestTracks: tracks(take: $take, page: $page) {
        data {
          hash
          title
          poster_url
          artist {
            stage_name
            hash
          }
        }
      }

      latestPlaylists: playlists(take: $take, page: $page,) {
        data {
          hash
          title
          cover_url
        }
      }

      latestArtists: artists(take: $take, page: $page) {
        data {
          stage_name
          hash
          poster_url
        }
      }

      latestAlbums: albums(take: 10, page: $page) {
        data {
          title
          hash
          cover_url
          artist {
            stage_name
            hash
            poster_url
          }
        }
      }
    }
  }
`

export const FETCH_TRACKS = gql`
  query tracksData($page: Int, $take: Int, $orderBy: [OrderByClause!]) {
    # Latest 10 tracks
    tracks(take: $take, page: $page, orderBy: $orderBy) {
      data {
        hash
        title
        poster_url
        artist {
          stage_name
          hash
        }
      }
      paginatorInfo {
        hasMorePages
        currentPage
      }
    }
  }
`

export const FETCH_TRACKS_BY_GENRE = gql`
  query tracksDataByGenre($page: Int, $take: Int, $orderBy: [OrderByClause!], $slug: String!) {
    genre(slug: $slug) {
      name
    }

    tracksByGenre(take: $take, page: $page, orderBy: $orderBy, slug: $slug) {
      data {
        hash
        title
        poster_url
        artist {
          stage_name
          hash
        }
      }
      paginatorInfo {
        hasMorePages
        currentPage
      }
    }
  }
`

export const FETCH_RELATED_TRACKS = gql`
  query relatedTracksData($input: RelatedTracksInput!) {
    relatedTracks(input: $input) {
      hash
      title
      poster_url
      artist {
        stage_name
        hash
      }
    }
  }
`

export const FETCH_RANDOM_ARTISTS = gql`
  query randomArtistsData($input: RandomArtistsInput!) {
    randomArtists(input: $input) {
      hash
      name
      poster_url
    }
  }
`

export const FETCH_GENRES = gql`
  query fetchGenres {
    genres {
      name
      slug
    }
  }
`

export const FETCH_RANDOM_ALBUMS = gql`
  query randomAlbumsData($input: RandomAlbumsInput!) {
    randomAlbums(input: $input) {
      hash
      title
      cover_url
      artist {
        hash
        stage_name
      }
    }
  }
`

export const FETCH_RANDOM_PLAYLISTS = gql`
  query randomPlaylistsData($input: RandomPlaylistsInput!) {
    randomPlaylists(input: $input) {
      hash
      title
      cover_url
    }
  }
`

export const FETCH_ARTISTS = gql`
  query artistsData($page: Int, $take: Int, $orderBy: [OrderByClause!]) {
    # Latest 10 artists
    artists(take: $take, page: $page, orderBy: $orderBy) {
      data {
        hash
        stage_name
        poster_url
      }
      paginatorInfo {
        hasMorePages
        currentPage
      }
    }
  }
`

export const FETCH_PLAYLISTS = gql`
  query playlistsData($page: Int, $take: Int, $orderBy: [OrderByClause!]) {
    # Latest 10 playlists
    playlists(take: $take, page: $page, orderBy: $orderBy) {
      data {
        hash
        title
        cover_url
      }
      paginatorInfo {
        hasMorePages
        currentPage
      }
    }
  }
`

export const FETCH_ALBUMS = gql`
  query albumsData($page: Int, $take: Int, $orderBy: [OrderByClause!]) {
    # Latest 10 albums
    albums(take: $take, page: $page, orderBy: $orderBy) {
      data {
        hash
        title
        cover_url
        artist {
          hash
          stage_name
          poster_url
        }
      }
      paginatorInfo {
        hasMorePages
        currentPage
      }
    }
  }
`

export const FETCH_MY_ALBUMS = gql`
  query myAlbumsData($page: Int, $take: Int) {
    me {
      albums(take: $take, page: $page) {
        data {
          hash
          title
        }
      }
    }
  }
`

export const FETCH_MY_PLAYLISTS = gql`
  query myPlaylistsData($page: Int, $take: Int) {
    me {
      playlists(take: $take, page: $page) {
        data {
          hash
          title
        }
      }
    }
  }
`

export const FETCH_MY_TRACKS = gql`
  query myTracksData($page: Int, $take: Int) {
    me {
      tracks(take: $take, page: $page) {
        data {
          hash
          title
        }
      }
    }
  }
`

export const FETCH_MY_ARTISTS = gql`
  query myArtistData($page: Int, $take: Int) {
    me {
      artists(take: $take, page: $page) {
        data {
          hash
          stage_name
        }
      }
    }
  }
`

export const FETCH_TRACK = gql`
  query trackDetail($hash: String!) {
    track(hash: $hash) {
      title
      hash
      allowDownload
      audio_url
      poster_url
      featured
      detail
      lyrics
      play_count
	    download_count
      audio_file_size
      genre {
        name
        slug
      }
      artist {
        stage_name
        hash
      }
      album {
        title
        hash
      }
    }
  }
`

export const FETCH_ARTIST = gql`
  query artistDetail($hash: String!) {
    artist(hash: $hash) {
      hash
      name
      stage_name
      poster_url
      bio
      facebook_url
      twitter_url
      youtube_url
      instagram_url
      tracks {
        hash
        title
        poster_url
      }
      albums {
        hash
        title
        cover_url
      }
    }
  }
`

export const FETCH_ALBUM = gql`
  query albumDetail($hash: String!) {
    album(hash: $hash) {
      id
      title
      hash
      cover_url
      detail
      release_year
      tracks {
        hash
        title
        poster_url
        audio_url
        number
        play_count
        download_count
      }
      artist {
        hash
        stage_name
      }
    }
  }
`

export const FETCH_PLAYLIST = gql`
  query playlistDetail($hash: String!) {
    playlist(hash: $hash) {
      id
      title
      hash
      cover_url
      tracks {
        hash
        title
        poster_url
        audio_url
        number
        play_count
        download_count
        artist {
          hash
          stage_name
        }
      }
      user {
        name
      }
    }
  }
`

export const FETCH_DOWNLOAD_URL = gql`
  query download($input: DownloadInput!) {
    download(input: $input) {
      url
    }
  }
`

export const UPLOAD_URL_QUERY = gql`
  query getUploadUrl($input: UploadUrlInput!) {
    uploadUrl(input: $input) {
     signedUrl
     filename
    }
  }
`

export const TRACK_UPLOAD_DATA_QUERY = gql`
  query fetchTrackUploadData {
    genres {
      id
      name
  	}
    me {
      artists_by_stage_name_asc(take: 50) {
        data {
          id
          stage_name
        }
      }
    }
  }
`

export const SEARCH_QUERY = gql`
  query search($query: String!) {
    search(query: $query) {
      tracks {
        hash
        title
        poster_url
        artist {
          hash
          stage_name
        }
      }
      artists {
        hash
        stage_name
        poster_url
      }
      albums {
        hash
        title
        cover_url
         artist {
          hash
          stage_name
        }
      }
    }
  }
`

export const LOG_USER_IN = gql`
  query logUserIn($input: LoginInput!) {
    login(input: $input) {
      token
      data {
        id
        name
        email
        avatar_url
        telephone
        created_at
      }
    }
  }
`

export const FACEBOOK_LOGIN_URL = gql`
  query facebookLoginUrl {
    facebookLoginUrl {
      url
    }
  }
`