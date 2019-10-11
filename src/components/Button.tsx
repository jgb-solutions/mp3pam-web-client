import { lighten } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/styles";
import { Button } from "@material-ui/core";

import colors from "../utils/colors";

export default withStyles({
	root: {
		backgroundColor: colors.primary,
		color: colors.white,
		paddingLeft: 40,
		paddingRight: 40,
		border: "none",
		borderRadius: 20,
		fontWeight: "bold",
		fontSize: 12,
		letterSpacing: 1,
		transition: "all .1s ease-in-out",
		"&:hover": {
			transform: "scale(1.1)",
			backgroundColor: lighten(colors.primary, 0.1)
		},
		"&:active": {
			outline: "none"
		},
		"&:focus": {
			outline: "none"
		}
	},
})(Button);