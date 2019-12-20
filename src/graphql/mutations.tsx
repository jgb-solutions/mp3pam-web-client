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