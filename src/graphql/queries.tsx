import gql from 'graphql-tag'

export const UPLOAD_URL_QUERY = gql`
  query getUploadUrl($name: String!, $bucket: String!) {
    uploadUrl(name: $name, bucket: $bucket) {
     signedUrl
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
      artists_by_stage_name_asc(take: 50) {
        data {
          id
          stage_name
        }
      }
    }
  }
`;