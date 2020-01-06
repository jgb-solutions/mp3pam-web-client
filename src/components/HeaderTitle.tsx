import React from 'react'
import { makeStyles } from "@material-ui/core/styles"
import { CSSProperties } from '@material-ui/core/styles/withStyles'

const useStyles = makeStyles({
  container: {
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    marginTop: 5,
    marginRight: 5,
  },
  text: {
    textTransform: 'capitalize'
  }
})

type Props = {
  icon: React.ReactNode,
  text: string,
  style?: CSSProperties,
  textStyle?: CSSProperties,
  onClick?: () => void
}

export default function HeaderTitle(props: Props) {
  const styles = useStyles()
  let propStyles: CSSProperties = {}

  if (props.onClick) {
    propStyles = { ...props.style, cursor: 'pointer' }
  }

  return (
    <div className={styles.container} style={propStyles} onClick={props.onClick}>
      <div className={styles.icon} style={props.textStyle}>{props.icon}</div>
      <h1 className={styles.text} style={props.textStyle} dangerouslySetInnerHTML={{ __html: props.text }} />
    </div>
  )
}