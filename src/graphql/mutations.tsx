import gql from 'graphql-tag';

export const ADD_TRACK_MUTATION = gql`
  mutation addTrack($input: TrackInput!) {
    addTrack(input: $input) {
    	id
		 	title
		 	hash
    }
  }
`

export const ADD_ARTIST_MUTATION = gql`
  mutation addTrack($input: ArtistInput!) {
    addArtist(input: $input) {
     id
     stage_name
   }
  }
`

export const LOG_OUT_MUTATION = gql`
  mutation {
  logout {
    success
  }
}
`