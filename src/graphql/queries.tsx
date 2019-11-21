import gql from 'graphql-tag'

export const UPLOAD_URL = gql`
  query getUploadUrl($name: String!, $bucket: String!) {
    uploadUrl(name: $name, bucket: $bucket) {
     signedUrl
		 fileUrl
     filename
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