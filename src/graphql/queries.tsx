import gql from 'graphql-tag'

export const FETCH_HOME = gql`
  query homePageData($page: Int, $take: Int, $orderBy: [OrderByClause!]) {
    # Latest 10 tracks
    latestTracks: tracks(take: $take, page: $page, orderBy: $orderBy) {
      data {
        hash
        title
        posterUrl
        artist {
          stageName
          hash
        }
      }
    }

    # Latest 10 playlists
    latestPlaylists: playlists(take: $take, page: $page, orderBy: $orderBy) {
      data {
        hash
        title
        coverUrl
      }
    }

    # latest 1o artists
    latestArtists: artists(take: $take, orderBy: $orderBy) {
      data {
        stageName
        hash
        posterUrl
      }
    }

    # latest 1o albums
    latestAlbums: albums(take: $take, orderBy: $orderBy) {
      data {
        title
        hash
        coverUrl
        artist {
          stageName
          hash
          posterUrl
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
          posterUrl
          artist {
            stageName
            hash
          }
        }
      }

      latestPlaylists: playlists(take: $take, page: $page,) {
        data {
          hash
          title
          coverUrl
        }
      }

      latestArtists: artists(take: $take, page: $page) {
        data {
          stageName
          hash
          posterUrl
        }
      }

      latestAlbums: albums(take: 10, page: $page) {
        data {
          title
          hash
          coverUrl
          artist {
            stageName
            hash
            posterUrl
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
        posterUrl
        artist {
          stageName
          hash
        }
      }
      paginationInfo {
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
        posterUrl
        artist {
          stageName
          hash
        }
      }
      paginationInfo {
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
      posterUrl
      artist {
        stageName
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
      posterUrl
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
      coverUrl
      artist {
        hash
        stageName
      }
    }
  }
`

export const FETCH_RANDOM_PLAYLISTS = gql`
  query randomPlaylistsData($input: RandomPlaylistsInput!) {
    randomPlaylists(input: $input) {
      hash
      title
      coverUrl
    }
  }
`

export const FETCH_ARTISTS = gql`
  query artistsData($page: Int, $take: Int, $orderBy: [OrderByClause!]) {
    # Latest 10 artists
    artists(take: $take, page: $page, orderBy: $orderBy) {
      data {
        hash
        stageName
        posterUrl
      }
      paginationInfo {
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
        coverUrl
      }
      paginationInfo {
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
        coverUrl
        artist {
          hash
          stageName
          posterUrl
        }
      }
      paginationInfo {
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
          stageName
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
      audioUrl
      posterUrl
      featured
      detail
      lyrics
      playCount
	    downloadCount
      audioFileSize
      genre {
        name
        slug
      }
      artist {
        stageName
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
      stageName
      posterUrl
      bio
      facebookUrl
      twitterUrl
      youtubeUrl
      instagramUrl
      tracks {
        hash
        title
        posterUrl
      }
      albums {
        hash
        title
        coverUrl
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
      coverUrl
      detail
      releaseYear
      tracks {
        hash
        title
        posterUrl
        audioUrl
        number
        playCount
        downloadCount
      }
      artist {
        hash
        stageName
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
      coverUrl
      tracks {
        hash
        title
        posterUrl
        audioUrl
        number
        playCount
        downloadCount
        artist {
          hash
          stageName
        }
      }
      user {
        name
      }
    }
  }
`

export const FETCH_DOWNLOADUrl = gql`
  query download($input: DownloadInput!) {
    download(input: $input) {
      url
    }
  }
`

export const UPLOADUrl_QUERY = gql`
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
      artists_by_stageName_asc(take: 50) {
        data {
          id
          stageName
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
        posterUrl
        artist {
          hash
          stageName
        }
      }
      artists {
        hash
        stageName
        posterUrl
      }
      albums {
        hash
        title
        coverUrl
         artist {
          hash
          stageName
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
        avatarUrl
        telephone
        insertedAt
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