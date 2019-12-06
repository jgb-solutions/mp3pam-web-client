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

    # latest 1o albums
    latestAlbums: albums(take: 10, orderBy: [{ field: "created_at", order: DESC }]) {
      data {
        title
        hash
        cover_url
        artist {
          stage_name
          hash
          poster_url
        }
      }
    }
  }
`;

export const FETCH_TRACKS = gql`
  query tracksData($page: Int, $take: Int, $orderBy: [OrderByClause!]) {
    # Latest 10 tracks
    tracks(take: $take, page: $page, orderBy: $orderBy) {
      data {
        hash
        title
        poster_url
        artist {
          stage_name
          hash
        }
      }
      paginatorInfo {
        hasMorePages
        currentPage
      }
    }
  }
`;

export const FETCH_ARTISTS = gql`
  query artistsData($page: Int, $take: Int, $orderBy: [OrderByClause!]) {
    # Latest 10 artists
    artists(take: $take, page: $page, orderBy: $orderBy) {
      data {
        hash
        stage_name
        poster_url
      }
      paginatorInfo {
        hasMorePages
        currentPage
      }
    }
  }
`;

export const FETCH_TRACK = gql`
  query trackDetail($hash: String!) {
    track(hash: $hash) {
      title
      hash
      audio_url
      poster_url
      featured
      detail
      lyrics
      genre {
        name
        slug
      }
      artist {
        stage_name
        hash
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