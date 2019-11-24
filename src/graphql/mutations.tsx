import gql from 'graphql-tag';

export const ADD_TRACK = gql`
  mutation addTrack($input: TrackInput!) {
    addTrack(input: $input) {
    	id
		 	title
		 	hash
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