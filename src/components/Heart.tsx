import {
	Favorite,
	FavoriteBorder,
} from "@material-ui/icons";
import React from 'react';
import IconButton from "@material-ui/core/IconButton";
import {
	Theme,
	WithStyles,
	withStyles,
	createStyles,
} from "@material-ui/core/styles";

import colors from "../utils/colors";

const styles = (theme: Theme) =>
	createStyles({
		icon: {
			fontSize: 18,
			color: colors.grey
    },
    border: {
      color: colors.white,
      padding: 5,
      border: "1px solid white",
      borderRadius: "50%",
      marginLeft: 15
    },
  });

interface Props extends WithStyles<typeof styles> {
  toggleFavorite?: () => void,
  isFavorite?: boolean,
  border?: boolean,
}

function Heart(props: Props) {
  const { classes, toggleFavorite, isFavorite } = props;
  return (
    <IconButton onClick={toggleFavorite} className={props.border ? classes.border : ''}>
      {isFavorite && (
        <Favorite className={classes.icon} />
      )}
      {!isFavorite && (
        <FavoriteBorder className={classes.icon} />
      )}
    </IconButton>
  )
}

export default withStyles(styles)(Heart)
