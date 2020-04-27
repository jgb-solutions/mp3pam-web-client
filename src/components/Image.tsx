// https://developer.wordpress.com/docs/photon/api/

import React from 'react'
import { CSSProperties } from '@material-ui/core/styles/withStyles'

const PHOTON_HOSTS = ['i0.wp.com', 'i1.wp.com', 'i2.wp.com', 'i3.wp.com']

interface Props {
  src: string
  title?: string
  alt?: string
  className?: string
  style?: CSSProperties
  photon?: Photon
}

interface Photon {
  // http://i0.wp.com/s.ma.tt/files/2012/06/DSC01205.jpg?w=300
  // http://i0.wp.com/s.ma.tt/files/2012/06/DSC01205.jpg?w=15%
  width?: number | string // width. Defaults to pixels, supports percentages.
  // http://i0.wp.com/s.ma.tt/files/2012/06/MCM_0629-1600x1064.jpg?h=200
  // http://i0.wp.com/s.ma.tt/files/2012/06/MCM_0629-1600x1064.jpg?h=20%
  height?: number | string // height. Defaults to pixels, supports percentages.
  // http://i0.wp.com/s.ma.tt/files/2012/06/4-MCM_0830-1600x1064.jpg?crop=12,25,60,60
  // http://i0.wp.com/s.ma.tt/files/2012/06/4-MCM_0830-1600x1064.jpg?crop=160px,160px,788px,788px
  // http://i0.wp.com/s.ma.tt/files/2012/06/4-MCM_0830-1600x1064.jpg?crop=160px,25,1400px,60
  crop?: {
    x: number | string // x-offset percentage or numberpx
    y: number | string // y-offset percentage or numberpx
    w: number | string // width percentage or numberpx
    h: number | string // height percentage or numberpx
  },
  // http://i0.wp.com/s.ma.tt/files/2012/06/9-DSC01406-1600x1066.jpg?resize=400,220
  resize?: {
    width: number
    height: number
  },
  // http://i0.wp.com/s.ma.tt/files/2010/10/MCM_4049.jpg?fit=300,300
  fit?: {
    width: number
    height: number
  },
  // http://i0.wp.com/developer.files.wordpress.com/2013/03/letterboxing-example.jpg?lb=310,250
  lb?: { // black letterboxing
    width: number
    height: number
  },
  // http://i0.wp.com/developer.files.wordpress.com/2012/11/black-letterboxing-example.jpg?ulb=true
  ulb?: boolean, // remove black letterboxing
  // https://i0.wp.com/s.ma.tt/files/2010/12/MCM_5875-1600x1064.jpg?w=200&filter=negate
  // https://i0.wp.com/s.ma.tt/files/2010/12/MCM_5875-1600x1064.jpg?w=200&filter=grayscale
  // https://i0.wp.com/s.ma.tt/files/2010/12/MCM_5875-1600x1064.jpg?w=200&filter=sepia
  // https://i0.wp.com/s.ma.tt/files/2010/12/MCM_5875-1600x1064.jpg?w=200&filter=edgedetect
  // https://i0.wp.com/s.ma.tt/files/2010/12/MCM_5875-1600x1064.jpg?w=200&filter=emboss
  // https://i0.wp.com/s.ma.tt/files/2010/12/MCM_5875-1600x1064.jpg?w=200&filter=blurgaussian
  // https://i0.wp.com/s.ma.tt/files/2010/12/MCM_5875-1600x1064.jpg?w=200&filter=blurselective
  // https://i0.wp.com/s.ma.tt/files/2010/12/MCM_5875-1600x1064.jpg?w=200&filter=meanremoval
  filter?: 'negate' | 'grayscale' | 'sepia' | 'edgedetect' | 'emboss' | 'blurgaussian' | 'blurselective' | 'meanremoval',
  // http://i0.wp.com/s.ma.tt/files/2011/06/MCM_9517-1600x1065.jpg?brightness=-40
  // http://i0.wp.com/s.ma.tt/files/2011/06/MCM_9517-1600x1065.jpg?brightness=0
  // http://i0.wp.com/s.ma.tt/files/2011/06/MCM_9517-1600x1065.jpg?brightness=80
  brightness?: number // -255 is black and 255 is white
  // http://i0.wp.com/s.ma.tt/files/2011/06/MCM_9517-1600x1065.jpg?contrast=-50
  // http://i0.wp.com/s.ma.tt/files/2011/06/MCM_9517-1600x1065.jpg?contrast=0
  // http://i0.wp.com/s.ma.tt/files/2011/06/MCM_9517-1600x1065.jpg?contrast=50
  contrast?: number // -100 through 100
  // http://i0.wp.com/s.ma.tt/files/2012/01/DSC00259.jpg?colorize=100,0,0
  // http://i0.wp.com/s.ma.tt/files/2012/01/DSC00259.jpg?colorize=0,100,0
  // http://i0.wp.com/s.ma.tt/files/2012/01/DSC00259.jpg?colorize=0,0,100
  colorize?: { // RGB values such as 255,0,0 (red), 0,255,0 (green), 0,0,255 (blue)
    red: number
    green: number
    blue: number
  },
  // http://i0.wp.com/s.ma.tt/files/2011/06/MCM_9230-1600x1064.jpg?smooth=1
  smooth?: number // 0 appears to be maximum smoothing with higher numbers being less smoothing.
  // http://i0.wp.com/s.ma.tt/files/2012/02/MCM_4246-1600x1064.jpg?w=310&zoom=2
  zoom?: 1 | 1.5 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10. // Valid zoom levels are 1, 1.5, 2-10.
  // http://i0.wp.com/ma.tt/files/2014/09/8084136238_169f1ca1f0_o.jpg?w=310&quality=50
  quality?: number // values between 20 and 100
  // http://i0.wp.com/ma.tt/files/2012/06/13-MCM_0885.jpg?w=310&strip=all
  strip?: 'all' | 'info' | 'color' // strip functionality to remove JPEG image Exif, IPTC, comment, and color data
}


const makePhotonUrl = (photon: Photon, domainWithoutProtocol: string) => {
  const photonHost = PHOTON_HOSTS[Math.floor(Math.random() * PHOTON_HOSTS.length)]

  let photonQuery = ``

  if (photon.width) {
    photonQuery += `&w=${photon.width}`
  }

  if (photon.height) {
    photonQuery += `&h=${photon.height}`
  }

  if (photon.crop) {
    const { x, y, w, h } = photon.crop
    photonQuery += `&crop=${x},${y},${w},${h}`
  }

  if (photon.resize) {
    const { width, height } = photon.resize
    photonQuery += `&resize=${width},${height}`
  }

  if (photon.fit) {
    const { width, height } = photon.fit
    photonQuery += `&fit=${width},${height}`
  }

  if (photon.ulb) {
    photonQuery += `&ulb=true`
  }

  if (photon.lb) {
    const { width, height } = photon.lb
    photonQuery += `&lb=${width},${height}`
  }


  if (photon.filter) {
    photonQuery += `&filter=${photon.filter}`
  }

  if (photon.brightness) {
    photonQuery += `&brightness=${photon.brightness}`
  }

  if (photon.contrast) {
    photonQuery += `&contrast=${photon.contrast}`
  }

  if (photon.colorize) {
    const { red, green, blue } = photon.colorize
    photonQuery += `&colorize=${red},${green},${blue}`
  }

  if (photon.smooth) {
    photonQuery += `&smooth=${photon.smooth}`
  }

  if (photon.zoom) {
    photonQuery += `&zoom=${photon.zoom}`
  }

  if (photon.quality) {
    photonQuery += `&quality=${photon.quality}`
  }

  if (photon.strip) {
    photonQuery += `&strip=${photon.strip}`
  }

  const photonUrl = `https://${photonHost}/${domainWithoutProtocol}?${photonQuery}`

  return photonUrl
}

function Image(props: Props) {
  const { style: propStyle, src, photon, alt, ...rest } = props
  const domainWithoutProtocol = src.replace(/(^\w+:|^)\/\//, '')

  const style: CSSProperties = {
    maxWidth: '100%',
    ...propStyle
  }

  let optimizedProps = { src }

  if (photon) {
    optimizedProps.src = makePhotonUrl(photon, domainWithoutProtocol)
  }

  return <img {...rest} style={style} {...optimizedProps} alt={alt} />
}

Image.phoneCdnUrl = function (url: string, options: Photon) {
  const domainWithoutProtocol = url.replace(/(^\w+:|^)\/\//, '')

  const photonHost = PHOTON_HOSTS[Math.floor(Math.random() * PHOTON_HOSTS.length)]

  let photonQuery = ``

  if (options.width) {
    photonQuery += `&w=${options.width}`
  }

  if (options.height) {
    photonQuery += `&h=${options.height}`
  }

  if (options.crop) {
    const { x, y, w, h } = options.crop
    photonQuery += `&crop=${x},${y},${w},${h}`
  }

  if (options.resize) {
    const { width, height } = options.resize
    photonQuery += `&resize=${width},${height}`
  }

  if (options.fit) {
    const { width, height } = options.fit
    photonQuery += `&fit=${width},${height}`
  }

  if (options.ulb) {
    photonQuery += `&ulb=true`
  }

  if (options.lb) {
    const { width, height } = options.lb
    photonQuery += `&lb=${width},${height}`
  }


  if (options.filter) {
    photonQuery += `&filter=${options.filter}`
  }

  if (options.brightness) {
    photonQuery += `&brightness=${options.brightness}`
  }

  if (options.contrast) {
    photonQuery += `&contrast=${options.contrast}`
  }

  if (options.colorize) {
    const { red, green, blue } = options.colorize
    photonQuery += `&colorize=${red},${green},${blue}`
  }

  if (options.smooth) {
    photonQuery += `&smooth=${options.smooth}`
  }

  if (options.zoom) {
    photonQuery += `&zoom=${options.zoom}`
  }

  if (options.quality) {
    photonQuery += `&quality=${options.quality}`
  }

  if (options.strip) {
    photonQuery += `&strip=${options.strip}`
  }

  const photonUrl = `https://${photonHost}/${domainWithoutProtocol}?${photonQuery}`

  return photonUrl
}
export default Image