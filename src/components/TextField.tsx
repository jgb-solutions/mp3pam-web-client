import TextField from "@material-ui/core/TextField";
import { withStyles } from '@material-ui/styles';
import colors from "../utils/colors";

export default withStyles({
  root: {
    width: '100%',
    // '& input': {
    //   color: colors.white,
    //   borderBottom: '2px solid white',
    // },
    // '& label': {
    //   color: colors.white
    // },
    '& label.Mui-focused': {
      color: colors.primary,
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: colors.primary,
    }
  }
})(TextField)
