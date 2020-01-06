export const ALL = "all"
export const ONE = "one"
export const NONE = "none"
export const SMALL_SCREEN_SIZE = 768
export const IMG_BUCKET = process.env.NODE_ENV === 'development'
  ? `img-storage-dev.mp3pam.com`
  : `img-storage-prod.mp3pam.com`
export const AUDIO_BUCKET = process.env.NODE_ENV === 'development'
  ? `audio-storage-dev.mp3pam.com`
  : `audio-storage-prod.mp3pam.com`
export const MAX_AUDIO_FILE_SIZE = (sizeInMB = 128) => sizeInMB * 1000 * 1024
export const MAX_IMG_FILE_SIZE = (sizeInMB = 1) => sizeInMB * 1000 * 1024
export const MIN_SOCIAL_MEDIA_USERNAME_LENGTH = 3
export const MIN_ARTIST_BIO_LENGTH = 300
export const MIN_TRACK_LYRICS_LENGTH = 300
export const MIN_TRACK_DETAIL_LENGTH = 20
export const CURRENT_YEAR = new Date().getFullYear()
export const RELATED_TRACKS_NUMBER = 10
export const RANDOM_ARTISTS_NUMBER = 6
export const RANDOM_ALBUMS_NUMBER = 6
export const RANDOM_PLAYLISTS_NUMBER = 6
export const HOMEPAGE_PER_PAGE_NUMBER = 10
export const MANAGE_PAGE_PER_PAGE_NUMBER = 10
export const FETCH_ALBUMS_NUMBER = 24
export const FETCH_MY_ALBUMS_NUMBER = 50
export const FETCH_MY_PLAYLISTS_NUMBER = 50
export const FETCH_MY_TRACKS_NUMBER = 200
export const FETCH_MY_ARTISTS_NUMBER = 200
export const FETCH_TRACKS_NUMBER = 24
export const FETCH_ARTISTS_NUMBER = 24
export const FETCH_PLAYLISTS_NUMBER = 24
export const SECONDS_TO_UPDATE_PLAY_COUNT = 30
export const APP_NAME = `MP3PAM`
export const FB_APP_ID = `232624100615967`
export const TWITTER_HANDLE = `mp3pam`
export const SEO_TRACK_TYPE = `music.song`
export const SEO_ARTIST_TYPE = `music:musician`
export const SEO_ALBUM_TYPE = `music:album`
export const SEO_PLAYLIST_TYPE = `music.playlist`

// Google Adsense
export const GOOGLE_ADS_CLIENT = `ca-pub-3793163111580068`

export const DOMAIN = process.env.REACT_APP_DOMAIN || `https://mp3pam.com`
export const API_URL = process.env.REACT_APP_API_URL || `https://api.mp3pam.com/graphql`