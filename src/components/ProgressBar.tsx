import { withStyles } from '@material-ui/styles';
import { darken } from '@material-ui/core/styles';
import colors from '../utils/colors';
import { LinearProgress } from '@material-ui/core';

const ProgressBar = withStyles({
  root: {
    height: 10,
    backgroundColor: darken(colors.primary, 0.5)
  },
  bar: {
    borderRadius: 20,
    backgroundColor: colors.primary
  }
})(LinearProgress);

export default ProgressBar;