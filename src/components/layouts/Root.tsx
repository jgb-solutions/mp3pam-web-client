import React, { ReactNode } from 'react'
import { CssBaseline, Grid, MuiThemeProvider, createMuiTheme } from '@material-ui/core'
import { makeStyles } from "@material-ui/core/styles"
import { Helmet } from 'react-helmet'

import Player from '../Player'
import colors from "../../utils/colors"

export const useStyles = makeStyles({
  '@global': {
    '*::-webkit-scrollbar': {
      width: '0.4em',
      height: '0.4em'
    },
    '*::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
    },
    '*::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.4)',
      outline: '1px solid slategrey'
    }
  },
  container: {
    backgroundColor: colors.black,
    maxWidth: 1200,
    margin: '0 auto',
  },
})

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    // primary: colors.primary
  },
})

export default function RootLayout({ children }: { children: ReactNode }) {
  const styles = useStyles()

  return (
    <div className="transition-container">
      {!!process.env.REACT_APP_SHOW_ADS && (
        <Helmet>
          <script data-ad-client="ca-pub-3793163111580068" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
        </Helmet>
      )}

      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Grid container className={`${styles.container} react-transition scale-in`}>
          {children}
        </Grid>
        <Player />
      </MuiThemeProvider>
    </div>
  )
}
