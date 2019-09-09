import {
	MoreHorizOutlined,
} from "@material-ui/icons";
import React, { useState } from 'react';
import IconButton from "@material-ui/core/IconButton";
import {
	Theme,
	WithStyles,
	withStyles,
	createStyles,
} from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import colors from "../utils/colors";

const styles = (theme: Theme) =>
	createStyles({
		icon: {
			fontSize: 18,
      color: colors.grey,
      '&:hover': {
        color: colors.white
      }
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
  border?: boolean,
}

function Heart(props: Props) {
  const { classes } = props;
  const [anchorEl, listAnchorEl] = useState(null);

  const handleClick = (event: any) => {
		listAnchorEl(event.currentTarget);
	}

	const handleClose = () => {
		listAnchorEl(null);
  }

  return (
    <>
      <IconButton
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick} className={props.border ? classes.border : ''}>
        <MoreHorizOutlined className={classes.icon} />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </>
  )
}

export default withStyles(styles)(Heart)
