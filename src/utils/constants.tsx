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