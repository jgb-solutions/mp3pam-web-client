import React from 'react'
import TextField from "@material-ui/core/TextField";
import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles({
  root: {
    '& label.Mui-focused': {
      color: 'green',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'green',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'red',
      },
      '&:hover fieldset': {
        borderColor: 'yellow',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'green',
      },
    },
  },
});

type Props = {

};

export default (props: any) => {
  const { root } = useStyles();
  return (
    <TextField {...props} classes={root} />
  )
}
