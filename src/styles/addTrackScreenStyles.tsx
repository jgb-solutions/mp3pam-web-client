import { makeStyles } from "@material-ui/core";
import colors from "../utils/colors";

export const addTrackScreenStyles = makeStyles({
  root: {
    backgroundColor: colors.contentGrey,
    color: colors.white,
    padding: 0,
  },
  button: {
    // marginTop: theme.spacing(1),
    // marginRight: theme.spacing(1),
  },
  actionsContainer: {
    // marginTop: 5,
  },
  resetContainer: {
    padding: 3,
  },
  stepLabel: {
    'label + &': {
      color: colors.white,
    }
  },
  formControl: {
    margin: 1,
    minWidth: 120,
  },
  selectGenre: {
    marginTop: 2,
    color: colors.white,
    borderBottom: colors.primary,
    '&:before': {
      borderColor: colors.primary,
    },
    '&:after': {
      borderColor: colors.primary,
    },
  },
  selectGenreIcon: {
    fill: colors.primary,
  },
  uploadButton: {
    marginTop: 24,
    marginBottom: 5,
  },
  successColor: { color: colors.success },
  errorColor: { color: colors.error },
});
