import { makeStyles } from "@material-ui/core"
import colors from "../utils/colors"

export const menuStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    color: colors.white,
    height: '100%',
    paddingBottom: 10,
  },
  menuList: {
    height: '100%',
    overflow: 'auto',
  },
  mainMenu: {
    marginBottom: 30
  },
  browseMenu: {
    marginBottom: 30
  },
  mainMenuLink: {
    marginBottom: 10,
  },
  yourLibraryLink: {
    textDecoration: 'none',
    color: colors.white
  },
  link: {
    color: colors.white,
    display: "flex",
    textDecoration: "none",
    fontWeight: "bold",
    "&:hover": {
      opacity: 0.8,
    },
    "&:active": {
      opacity: 0.5,
    }
  },
  linkIcon: {
    fontSize: 15,
    marginRight: 10
  },
  linkText: {
    fontSize: 15
  },
  libraryLink: {
    marginBottom: 15,
  },
  activeClassName: {
    color: colors.primary
  }
}))