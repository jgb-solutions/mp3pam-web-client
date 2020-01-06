import gql from 'graphql-tag'

export const ADD_TRACK_MUTATION = gql`
  mutation AddTrack($input: TrackInput!) {
    addTrack(input: $input) {
    	id
		 	title
		 	hash
    }
  }
`

export const ADD_ARTIST_MUTATION = gql`
  mutation AddArtist($input: ArtistInput!) {
    addArtist(input: $input) {
     id
     stage_name
   }
  }
`

export const CREATE_ALBUM_MUTATION = gql`
  mutation CreateAlbum($input: AlbumInput!) {
    createAlbum(input: $input) {
     title
     hash
   }
  }
`

export const ADD_GENRE_MUTATION = gql`
  mutation AddGenre($input: GenreInput!) {
    addGenre(input: $input) {
     id
     name
   }
  }
`

export const LOG_OUT_MUTATION = gql`
  mutation LogOut{
    logout {
      success
    }
  }
`

export const UPDATE_DOWNLOAD_COUNT = gql`
  mutation UpdateDownloadCount($input: DownloadInput!) {
    updateDownloadCount(input: $input)
  }
`

export const UPDATE_PLAY_COUNT = gql`
  mutation UpdatePlayCount($input: PlayInput!) {
    updatePlayCount(input: $input)
  }
`

export const DELETE_ALBUM = gql`
  mutation DeleteAlbum($hash: String!) {
    deleteAlbum(hash: $hash) {
      success
    }
  }
`

export const DELETE_TRACK = gql`
  mutation DeleteTrack($hash: String!) {
    deleteTrack(hash: $hash) {
      success
    }
  }
`

export const DELETE_ARTIST = gql`
  mutation DeleteArtist($hash: String!) {
    deleteArtist(hash: $hash) {
      success
    }
  }
`

export const DELETE_PLAYLIST = gql`
  mutation DeletePlaylist($hash: String!) {
    deletePlaylist(hash: $hash) {
      success
    }
  }
`

export const DELETE_ALBUM_TRACK = gql`
  mutation DeleteAlbumTrack($hash: String!) {
    deleteAlbumTrack(hash: $hash) {
      success
    }
  }
`
export const DELETE_PLAYLIST_TRACK = gql`
  mutation DeletePlaylistTrack($trackHash: String!, $playlistHash: String!) {
    deletePlaylistTrack(trackHash: $trackHash, playlistHash: $playlistHash) {
      success
    }
  }
`

export const ADD_TRACK_TO_ALBUM = gql`
  mutation AddTrackToAlbum($input: AddTrackToAlbumInput!) {
    addTrackToAlbum(input: $input) {
      success
    }
  }
`

export const ADD_TRACK_TO_PLAYLIST = gql`
  mutation AddTrackToPlaylist($playlistHash: String!, $trackHash: String!, ) {
    addTrackToPlaylist(playlistHash: $playlistHash, trackHash: $trackHash) {
      success
    }
  }
`
export const CREATE_PLAYLIST = gql`
  mutation CreatePlaylist($title: String!) {
    CreatePlaylist(title: $title) {
      hash
    }
  }
`

export const UPDATE_USER = gql`
  mutation UpdateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      id
      name
      email
      active
      avatar_url
      telephone
      created_at
    }
  }
`

export const FACEOOK_LOGIN = gql`
  mutation facebookLogin($code: String!) {
    handleFacebookConnect(code: $code) {
      data {
        id
        name
        email
        avatar_url
        telephone
        first_login
        created_at
      }
      token
    }
  }
`