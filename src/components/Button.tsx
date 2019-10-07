import { ReactNode } from "react";
import { makeStyles, lighten } from "@material-ui/core/styles";

import colors from "../utils/colors";
import { withStyles } from "@material-ui/styles";
import { Button } from "@material-ui/core";

const useStyles = makeStyles({
	primaryBtn: {
		backgroundColor: colors.primary,
		color: colors.white,
		paddingLeft: 40,
		paddingRight: 40,
		// height: 30,
		// border: "none",
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
	}
});

type Props = {
	style?: Object;
	onClick?: () => void;
	children: ReactNode;
	type?: "button" | "reset" | "submit" | undefined;
};

// const Button = (props: Props) => {
// 	const styles = useStyles();
// 	return (
// 		<>
// 			<button
// 				className={styles.primaryBtn}
// 				style={props.style}
// 				onClick={props.onClick}
// 				type={props.type}
// 			>
// 				{props.children}
// 			</button>
// 		</>
// 	);
// };

// export default Button;

export default withStyles({
	root: {
		backgroundColor: colors.primary,
		color: colors.white,
		paddingLeft: 40,
		paddingRight: 40,
		// height: 30,
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