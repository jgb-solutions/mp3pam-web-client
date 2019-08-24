import React from "react";
import Slider from "@material-ui/core/Slider";
import { makeStyles } from "@material-ui/core/styles";
import colors from "../utils/colors";

const useStyles = makeStyles({
	root: {
		color: colors.grey
	},
	track: {
		color: colors.primary,
		height: 4
	},
	rail: {
		height: 4
	}
});

const CustomSlider = (props: any) => {
	const styles = useStyles();

	return <Slider classes={styles} {...props} />;
};

export default CustomSlider;
