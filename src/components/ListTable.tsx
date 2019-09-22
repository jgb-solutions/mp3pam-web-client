import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import colors from '../utils/colors';
import Heart from './Heart';
import More from './More';
import PlayPause from './PlayPause';
import TrackInterface from '../interfaces/TrackInterface';
import { useSelector } from 'react-redux';
import AppStateInterface from '../interfaces/AppStateInterface';
import ListInterface from '../interfaces/ListInterface';

const useStyles = makeStyles(theme => ({
  table: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
}));

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
}))(TableCell);

type Props = {
  list: ListInterface
}

export default function ListTable(props: Props) {
  const classes = useStyles();
  const tracks = props.list.tracks;
  const currentTrack = useSelector(({ player }: AppStateInterface) => player.currentTrack);

  return (
    <Table className={classes.table} size="small">
      <TableHead>
        <TableRow>
          <StyledTableCell>&nbsp;</StyledTableCell>
          <StyledTableCell>Title</StyledTableCell>
          <StyledTableCell>Artist</StyledTableCell>
          <StyledTableCell>Album</StyledTableCell>
          <StyledTableCell>&nbsp;</StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {tracks && tracks.map((track: TrackInterface, index: number) => {
          const color = currentTrack
            && track.hash === currentTrack.hash ? colors.primary
            : undefined;

          return (
            <TableRow key={track.hash} style={{
              borderBottom: tracks.length - 1 === index ? '' : '1px solid white',
            }}>
              <StyledTableCell style={{ width: '15%', minWidth: '80px' }}>
                <PlayPause track={track} list={props.list} />
                <Heart />
              </StyledTableCell>
              <StyledTableCell style={{ width: '30%', color }}>{track.title}</StyledTableCell>
              <StyledTableCell style={{ width: '30%', color }}>{track.artist.name}</StyledTableCell>
              <StyledTableCell style={{ width: '20%', color }}>{track.title}</StyledTableCell>
              <StyledTableCell>
                <More />
              </StyledTableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  );
}
