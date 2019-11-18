import gql from 'graphql-tag';


export const PUT_TRACK_UPLOAD_DATA = gql`
  query PUTTrackUploadData {
    genres {
			data {
				id
				name
			}
  	}
  }
`;