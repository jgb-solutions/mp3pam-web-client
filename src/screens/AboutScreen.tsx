import React, { Component } from 'react'
import { Grid } from '@material-ui/core'
import FacebookIcon from '@material-ui/icons/Facebook'
import TwitterIcon from '@material-ui/icons/Twitter'
import YouTubeIcon from '@material-ui/icons/YouTube'
import TelegramIcon from '@material-ui/icons/Telegram'
import WhatsAppIcon from '@material-ui/icons/WhatsApp'

import Logo from '../components/Logo'
import LogoJGB from '../components/LogoJGB'
import SEO from '../components/SEO'
import { LinkWrapper } from './ArtistDetailScreen'
import colors from '../utils/colors'

export default class AboutScreen extends Component {
  render() {
    return (
      <div className='react-transition flip-in-x' style={{
        paddingTop: 100,
        textAlign: 'center',
      }}>
        <SEO title={`About Us`} />
        <Logo />

        <p>
          MP3Pam is a free entertainment platform for sharing all kinds of audios. <br />
          Music, Podcast, and even Ad. You name it.
        </p>

        <div style={{ maxWidth: 310, marginLeft: 'auto', marginRight: 'auto' }}>
          <Grid container spacing={2}>
            <Grid item>
              <LinkWrapper url="https://www.facebook.com/MP3PamOfficial/" target="_blank">
                <FacebookIcon style={{ fontSize: 48, cursor: 'pointer', color: colors.facebook }} />
              </LinkWrapper>
            </Grid>
            <Grid item>
              <LinkWrapper url="https://twitter.com/mp3pam" target="_blank">
                <TwitterIcon style={{ fontSize: 48, color: colors.twitter }} />
              </LinkWrapper>
            </Grid>
            <Grid item>
              <LinkWrapper url="https://wa.me/50941830318" target="_blank">
                <WhatsAppIcon style={{ fontSize: 48, color: colors.whatsapp }} />
              </LinkWrapper>
            </Grid>
            <Grid item>
              <LinkWrapper url="https://t.me/mp3pam" target="_blank">
                <TelegramIcon style={{ fontSize: 48, color: colors.telegram }} />
              </LinkWrapper>
            </Grid>
            <Grid item>
              <LinkWrapper url="https://www.youtube.com/user/TiKwenPam" target="_blank">
                <YouTubeIcon style={{ fontSize: 48, color: colors.youtube }} />
              </LinkWrapper>
            </Grid>
          </Grid>
        </div>

        <p>
          <small>Licensed under <a style={{ color: 'white' }} href="https://opensource.org/licenses/MIT" target="_blank" rel="noopener noreferrer">MIT</a>.
          </small>
        </p>

        <p><small>Version 1.0.0</small></p>

        <p>&copy; 2019</p>

        <LogoJGB />
      </div >
    )
  }
}