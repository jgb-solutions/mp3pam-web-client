import React, { Component } from 'react'

import Logo from '../components/Logo'
import LogoJGB from '../components/LogoJGB'

export default class AboutScreen extends Component {
  render() {
    return (
      <div className='react-transition flip-in-x' style={{
        paddingTop: 150,
        textAlign: 'center',
      }}>
        <Logo />
        <p>
          MP3Pam is a free entertainment platform for sharing all kinds of audios. <br />
          Music, Podcast, and even Ad. You name it.
                </p>

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