import {
  MoreHorizOutlined,
} from "@material-ui/icons"
import React, { useState } from 'react'
import IconButton from "@material-ui/core/IconButton"
import Menu from "@material-ui/core/Menu"
import MenuItem from "@material-ui/core/MenuItem"

import colors from "../utils/colors"
import { makeStyles } from "@material-ui/styles"

const useStyles = makeStyles({
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
  },
  menuItem: {
    '&:hover': {
      backgroundColor: colors.black, color: colors.white
    }
  }
})

type Option = {
  name: string,
  method: () => void,
}

type Props = {
  border?: boolean,
  options: Option[],
}

function Heart(props: Props) {
  const styles = useStyles()
  const [anchorEl, listAnchorEl] = useState(null)

  const handleMenu = (event: any) => {
    listAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    listAnchorEl(null)
  }

  const handleClick = (method: () => void) => {
    handleClose()
    method()
  }

  return (
    <>
      <IconButton
        aria-controls="context-menu"
        aria-haspopup="true"
        onClick={handleMenu} className={props.border ? styles.border : ''}>
        <MoreHorizOutlined className={styles.icon} />
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
        {props.options.map((option, index) =>
          <MenuItem
            key={index}
            onClick={() => handleClick(option.method)}
            className={styles.menuItem}>
            {option.name}
          </MenuItem>
        )}
      </Menu>
    </>
  )
}

export default Heart
