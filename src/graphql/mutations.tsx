import gql from 'graphql-tag';

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