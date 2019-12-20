import React, { ReactNode } from 'react'
import { makeStyles } from "@material-ui/core/styles"

import colors from '../utils/colors'


export const useStyles = makeStyles({
  divider: {
    fontSize: 16,
    fontWeight: 400,
    // borderTop: '1px solid #d9dadc',
    lineHeight: '1px',
    marginTop: 30,
    marginBottom: 30,
    marginLeft: 0,
    marginRight: 0,
    position: 'relative',
    textAlign: 'center',
    height: 6,
    border: 0,
    background:
      `
      linear-gradient(
        to right,
        ${colors.black} 0%,
        ${colors.primary} 55%,
        ${colors.primary} 55%,
        ${colors.black} 100%)
      `
  },
  title: {
    background: colors.black,
    fontSize: 12,
    letterSpacing: 1,
    paddingTop: 0,
    paddingRight: 20,
    paddingBottom: 0,
    paddingLeft: 20,
    textTransform: 'uppercase',
  },
  hr: {
    marginTop: 30,
    marginBottom: 30,
    height: 6,
    border: 0,
    background:
      `
    linear-gradient(
      to right,
      ${colors.black} 0%,
      ${colors.primary} 55%,
      ${colors.primary} 55%,
      ${colors.black} 100%)
    `
  }
})

type Props = { children: ReactNode }

const Divider = ({ children }: Props) => {
  const styles = useStyles()

  return (
    <div className={styles.divider}>
      <strong className={styles.title}>{children}</strong>
    </div>
  )
}

const HR = ({ style }: { style?: object }) => {
  const styles = useStyles()

  return <hr className={styles.hr} style={style} />
}

Divider.HR = HR

export default Divider