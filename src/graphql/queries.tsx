import gql from 'graphql-tag'

export const UPLOAD_URL_QUERY = gql`
  query getUploadUrl($name: String!, $bucket: String!) {
    uploadUrl(name: $name, bucket: $bucket) {
     signedUrl
		 fileUrl
     filename
    }
  }
`;

export const TRACK_UPLOAD_DATA_QUERY = gql`
  query fetchTrackUploadData {
    genres {
			data {
				id
				name
			}
  	}
    me {
      artists(take: 50) {
        data{
          id
          stage_name
        }
      }
    }
  }
`;