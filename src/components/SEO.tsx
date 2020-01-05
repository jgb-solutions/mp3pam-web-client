import React from 'react'
import { Helmet } from "react-helmet"

import { DOMAIN, FB_APP_ID, APP_NAME, TWITTER_HANDLE } from '../utils/constants'

type Props = {
  title?: string,
  url?: string,
  description?: string,
  type?: string,
  image?: string,
  artist?: string,
  imageWidth?: number,
  imageHeight?: number,
}

export default function SEO({ title, url, description, type, image, artist, imageWidth, imageHeight }: Props) {
  const titleContent = `${APP_NAME} - ${title || "Listen, Download and Share Unlimited Sounds!"}`
  const descriptionContent = description || `
      ${APP_NAME} is a free entertainment platform for sharing all kinds of sounds.
      Music, Podcast, and even Ad. You name it. Brought to you by JGB Solutions.
  `
  const imageContent = image || `${DOMAIN}/assets/images/social-media-share.png`

  return (
    <>
      <Helmet>
        <meta property="og:title" content={titleContent} />
        <meta property="og:site_name" content={APP_NAME} />
        <meta property="og:url" content={url || DOMAIN} />
        <meta property="og:description" content={descriptionContent} />
        <meta property="og:type" content={type || "website"} />
        <meta property="og:image" content={imageContent} />
        {imageWidth && <meta property="og:image:width" content={`${imageWidth}`} />}
        {imageHeight && <meta property="og:image:width" content={`${imageHeight}`} />}

        <meta property="fb:app_id" content={FB_APP_ID} />

        {artist && <meta property="music:musician" content={artist} />}
        {/* <meta property="music:album" content="http://open.spotify.com/album/7rq68qYz66mNdPfidhIEFa" />
        <meta property="music:album:track" content="2" />
        <meta property="music:duration" content="236" /> */}

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content={`@${TWITTER_HANDLE}`} />
        <meta name="twitter:title" content={titleContent} />
        <meta name="twitter:description" content={descriptionContent} />
        <meta name="twitter:image" content={imageContent} />

        <title>{titleContent}</title>
      </Helmet>
    </>
  )
}