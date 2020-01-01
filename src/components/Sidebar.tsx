import React from 'react'

import GoogleAdsense from './GoogleAdsense'
import { GOOGLE_ADS_CLIENT } from '../utils/constants'

export default () => {
  return process.env.NODE_ENV === 'production' ? (
    <GoogleAdsense
      client={GOOGLE_ADS_CLIENT}
      slot="8031420496"
    />
  ) : null
}