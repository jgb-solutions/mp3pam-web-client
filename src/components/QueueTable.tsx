import React from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

import colors from '../utils/colors'
import PlayPause from './PlayPause'
import { useSelector } from 'react-redux'
import AppStateInterface from '../interfaces/AppStateInterface'
import { SoundInterface } from '../interfaces/ListInterface'
import { Link } from 'react-router-dom'
import Routes from '../routes'
import { get } from 'lodash-es'

const useStyles = makeStyles(theme => ({
  table: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    fontWeight: 'bold'
  }
}))

const StyledTableCell = withStyles(theme => ({
  head: {
    color: colors.grey,
    textTransform: 'uppercase',
    textAlign: 'left',
    paddingLeft: 0
  },
  body: {
    fontSize: 14,
    color: colors.white,
    border: 'none',
    paddingLeft: 1,
    paddingRight: 1,
    textOverflow: 'ellipsis'
  },
}))(TableCell)

export default function QueueTable() {
  const styles = useStyles()

  const { currentSound, currentPlayingIndex, queueList, list } = useSelector(
    (appState: AppStateInterface) => appState.player
  )

  return (
    <Table className={styles.table} size="small">
      <TableHead>
        <TableRow>
          <StyledTableCell>&nbsp;</StyledTableCell>
          <StyledTableCell>Title</StyledTableCell>
          <StyledTableCell>By</StyledTableCell>
          <StyledTableCell>Type</StyledTableCell>
          <StyledTableCell>&nbsp;</StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {!!list && queueList.map((sound: SoundInterface, index: number) => {
          const color = currentSound &&
            sound.hash === currentSound.hash &&
            index === currentPlayingIndex ? colors.primary
            : undefined
          const soundPage = get(Routes, `${sound.type}`).detailPage(sound.hash)
          const authorPage = sound.type === 'track' ?
            Routes.artist.detailPage(sound.authorHash) :
            Routes.podcast.goToAuthorDetail(sound.authorHash)

          return (
            <TableRow key={index} style={{
              borderBottom: queueList.length - 1 === index ? '' : '1px solid white',
            }}>
              <StyledTableCell style={{ width: '10%', minWidth: '60px' }}>
                <PlayPause sound={sound} list={list} />
                {/* <Heart /> */}
              </StyledTableCell>
              <StyledTableCell style={{ width: '30%', color }}>
                <Link to={soundPage} className={styles.link} style={{ color }}>{sound.title}</Link>
              </StyledTableCell>
              <StyledTableCell style={{ width: '35%' }}>
                <Link to={authorPage} className={styles.link} style={{ color }}>{sound.authorName}</Link>
              </StyledTableCell>
              <StyledTableCell style={{ width: '20%', color }}>{sound.type.toUpperCase()}</StyledTableCell>
              {/* <StyledTableCell>
                <More />
              </StyledTableCell> */}
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
