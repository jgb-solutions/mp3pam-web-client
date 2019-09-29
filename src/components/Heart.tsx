import {
  Favorite,
  FavoriteBorder,
} from "@material-ui/icons";
import React from 'react';
import IconButton from "@material-ui/core/IconButton";

import colors from "../utils/colors";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  icon: {
    fontSize: 18,
    color: colors.grey
  },
  border: {
    color: colors.white,
    padding: 5,
    border: "1px solid white",
    borderRadius: "50%",
  },
});

type Props = {
  toggleFavorite?: () => void,
  isFavorite?: boolean,
  border?: boolean,
};

function Heart(props: Props) {
  const { toggleFavorite, isFavorite } = props;
  const styles = useStyles();

  return (
    <IconButton onClick={toggleFavorite} className={props.border ? styles.border : ''}>
      {isFavorite && (
        <Favorite className={styles.icon} />
      )}
      {!isFavorite && (
        <FavoriteBorder className={styles.icon} />
      )}
    </IconButton>
  )
}

export default Heart;
