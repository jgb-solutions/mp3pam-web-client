export const ALL = "all";
export const ONE = "one";
export const NONE = "none";
export const SMALL_SCREEN_SIZE = 768;
export const IMG_BUCKET = process.env.NODE_ENV === 'development'
  ? `img-storage-dev.mp3pam.com`
  : `img-storage-prod.mp3pam.com`;
export const AUDIO_BUCKET = process.env.NODE_ENV === 'development'
  ? `audio-storage-dev.mp3pam.com`
  : `audio-storage-prod.mp3pam.com`;
export const MAX_AUDIO_FILE_SIZE = (sizeInMB = 128) => sizeInMB * 1000 * 1024;
export const MAX_IMG_FILE_SIZE = (sizeInMB = 2) => sizeInMB * 1000 * 1024;
export const MIN_SOCIAL_MEDIA_USERNAME_LENGTH = 3;
export const MIN_ARTIST_BIO_LENGTH = 300;
export const MIN_TRACK_LYRICS_LENGTH = 300;
export const MIN_TRACK_DETAIL_LENGTH = 20;
export const CURRENT_YEAR = new Date().getFullYear();