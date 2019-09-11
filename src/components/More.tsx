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
    menuItem: {
      '&:hover': {
        backgroundColor: colors.black, color: colors.white
      }
    }
  });

interface Props extends WithStyles<typeof styles> {
  border?: boolean,
}

function Heart(props: Props) {
  const { classes } = props;
  const [anchorEl, listAnchorEl] = useState(null);

  const handleMenu = (event: any) => {
		listAnchorEl(event.currentTarget);
	}

	const handleClose = () => {
		listAnchorEl(null);
  }

  const menuItems = [
    {name: 'Add To Queue', method: () => {}},
    {name: 'Play Next', method: () => {}},
    {name: 'Go To Artist', method: () => {}},
    {name: 'Go To Album', method: () => {}},
    {name: 'Remove from your Liked Tracks', method: () => {}},
    {name: 'Add To Playlist', method: () => {}},
    {name: 'Share', method: () => {}},
  ]

  const handleClick = (method: () => void) => {
    handleClose();
    method()
  }

  return (
    <>
      <IconButton
        aria-controls="context-menu"
        aria-haspopup="true"
        onClick={handleMenu} className={props.border ? classes.border : ''}>
        <MoreHorizOutlined className={classes.icon} />
      </IconButton>
      <Menu
        id="context-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          style: {
            backgroundColor: colors.darkGrey,
            color: 'white',
          },
        }}
      >
        {menuItems.map((menuItem, index) =>
          <MenuItem
            key={index}
            onClick={() => handleClick(menuItem.method)}
            className={classes.menuItem}>
            {menuItem.name}
          </MenuItem>
        )}
      </Menu>
    </>
  )
}

export default withStyles(styles)(Heart)
