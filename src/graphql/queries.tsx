import gql from 'graphql-tag'

export const UPLOAD_URL = gql`
  query getUploadUrl($name: String!, $type: String!) {
    uploadUrl(name: $name, type: $type) {
     signedUrl
		 fileUrl
    }
  }
`;

export const FETCH_TRACK_UPLOAD_DATA = gql`
  query fetchTrackUploadData {
    genres {
			data {
				id
				name
			}
  	}
  }
`;