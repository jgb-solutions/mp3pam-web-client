import gql from 'graphql-tag'

export const FETCH_HOME = gql`
  query homePageData($page: Int, $take: Int, $orderBy: [OrderByClause!]) {
    # Latest 10 tracks
    latestTracks: tracks(take: $take, page: $page, orderBy: $orderBy) {
      data {
        hash
        title
        poster_url
        artist {
          stage_name
          hash
        }
      }
    }

    # latest 1o artists
    latestArtists: artists(take: 10, orderBy: [{ field: "created_at", order: DESC }]) {
      data {
        stage_name
        hash
        poster_url
      }
    }
  }
`;

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