import React, { ReactNode } from "react";
import { makeStyles, lighten } from "@material-ui/core/styles";

import colors from "../utils/colors";

const useStyles = makeStyles(() => ({
	primaryBtn: {
		backgroundColor: colors.primary,
		color: colors.white,
		paddingLeft: 40,
		paddingRight: 40,
		height: 30,
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
	}
}));

const Button = (props: {
	style?: Object;
	onClick(): void;
	children: ReactNode;
}) => {
	const styles = useStyles();
	return (
		<>
			<button
				className={styles.primaryBtn}
				style={props.style}
				onClick={props.onClick}
			>
				{props.children}
			</button>
		</>
	);
};

export default Button;
