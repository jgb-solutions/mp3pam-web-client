import React from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

import colors from '../utils/colors'
import { useSelector } from 'react-redux'
import AppStateInterface from '../interfaces/AppStateInterface'
import AlbumInterface, { AlbumTrackInterface } from '../interfaces/AlbumInterface'
import PlayPause from './PlayPause'
import { makeSoundFromTrack } from '../utils/helpers'
import ListInterface from '../interfaces/ListInterface'
import { Link } from 'react-router-dom'
import Routes from '../routes'

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

export const StyledTableCell = withStyles(theme => ({
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

type Props = { album: AlbumInterface, list: ListInterface }

export default function AlbumTracksTable({ album, list }: Props) {
  const styles = useStyles()

  const { currentSound } = useSelector(
    (appState: AppStateInterface) => appState.player
  )

  return (
    <Table className={styles.table} size="small">
      <TableHead>
        <TableRow>
          <StyledTableCell>#</StyledTableCell>
          <StyledTableCell>&nbsp;</StyledTableCell>
          <StyledTableCell>Title</StyledTableCell>
          {/* <StyledTableCell>Play</StyledTableCell> */}
          {/* <StyledTableCell>Download</StyledTableCell> */}
          {/* <StyledTableCell>By</StyledTableCell> */}
        </TableRow>
      </TableHead>
      <TableBody>
        {album.tracks.map((track: AlbumTrackInterface, index: number) => {
          const color = currentSound &&
            track.hash === currentSound.hash ? colors.primary
            : undefined

          return (
            <TableRow key={index} style={{
              borderBottom: album.tracks.length - 1 === index ? '' : '1px solid white',
            }}>
              <StyledTableCell style={{ width: '4%' }}>
                {track.number}
              </StyledTableCell>
              <StyledTableCell style={{ width: '10%', minWidth: '60px' }}>
                <PlayPause sound={makeSoundFromTrack({ ...track, artist: album.artist })} list={list} />
                {/* <Heart /> */}
              </StyledTableCell>
              <StyledTableCell style={{ width: '90%', color }}>
                <Link to={Routes.track.detailPage(track.hash)} className={styles.link} style={{ color }}>{track.title}</Link>
              </StyledTableCell>
              {/* <StyledTableCell style={{ width: '1.5%', color }}>{track.playCount}</StyledTableCell> */}
              {/* <StyledTableCell style={{ width: '1.5%', color }}>{track.downloadCount}</StyledTableCell> */}
              {/* <StyledTableCell style={{ width: '35%', color }}>{album.artist.stageName}</StyledTableCell> */}
              {/* <StyledTableCell style={{ width: '20%', color }}>{track.type.toUpperCase()}</StyledTableCell> */}
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
