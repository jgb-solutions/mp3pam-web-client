import { makeStyles } from "@material-ui/core/styles"

import colors from "../utils/colors"
import { SMALL_SCREEN_SIZE } from "../utils/constants"

export default makeStyles(theme => ({
  container: {
    display: "flex",
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    height: 86,
    backgroundColor: colors.darkGrey,
    color: "white",
    paddingLeft: 24,
    paddingRight: 24,
    zIndex: 999
  },
  player: {
    flex: 1,
    maxWidth: 1216,
    marginLeft: "auto",
    marginRight: "auto",
    display: "flex",
    justifyContent: "space-between"
  },
  posterTitle: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down(SMALL_SCREEN_SIZE)]: {
      display: 'none',
    },
    cursor: 'pointer',
  },
  image: {
    width: 55,
    height: 55
  },
  titleArtist: {
    paddingLeft: 10
  },
  title: {
    fontSize: 11,
    fontWeight: "bold",
    display: "block",
    marginBottom: -10
  },
  artist: {
    fontSize: 9,
    display: "block"
  },
  playlistVolume: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    [theme.breakpoints.down(SMALL_SCREEN_SIZE)]: {
      display: 'none',
    },
  },
  controls: {
    flex: 2,
    display: "flex",
    flexDirection: "column"
  },
  buttons: {
    width: "37%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
    [theme.breakpoints.down(SMALL_SCREEN_SIZE)]: {
      width: '70%',
    },
  },
  sliderTime: {
    display: "flex",
    width: "90%",
    alignSelf: "center",
    position: "relative"
  },
  slider: {
    flex: 1,
    marginLeft: 40,
    marginRight: 40,
    marginTop: -9
  },
  startTime: {
    fontSize: 10,
    position: "absolute",
    top: -4
  },
  endTime: {
    fontSize: 10,
    position: "absolute",
    top: -4,
    right: 0
  },
  icon: {
    fontSize: 18,
    color: colors.grey
  },
  playIcon: {
    fontSize: 48
  },
  volumeSliderContainer: {
    width: 70,
    marginLeft: 7
  },
  volumeIcons: {
    marginLeft: 15
  },
  bottomDrawer: {
    height: 100,
    backgroundColor: colors.darkGrey
  },
  bottomMenuIcon: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    [theme.breakpoints.up(SMALL_SCREEN_SIZE)]: {
      display: 'none'
    },
  }
}))