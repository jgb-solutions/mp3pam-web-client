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
import ListInterface, { SoundInterface } from '../interfaces/ListInterface';

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

export default function ListTable() {
  const styles = useStyles();

  const { currentSound, currentPlayingIndex, queueList, list } = useSelector(
    (appState: AppStateInterface) => appState.player
  );

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
            : undefined;

          return (
            <TableRow key={index} style={{
              borderBottom: queueList.length - 1 === index ? '' : '1px solid white',
            }}>
              <StyledTableCell style={{ width: '10%', minWidth: '60px' }}>
                <PlayPause sound={sound} list={list} />
                {/* <Heart /> */}
              </StyledTableCell>
              <StyledTableCell style={{ width: '30%', color }}>{sound.title}</StyledTableCell>
              <StyledTableCell style={{ width: '35%', color }}>{sound.author_name}</StyledTableCell>
              <StyledTableCell style={{ width: '20%', color }}>{sound.type.toUpperCase()}</StyledTableCell>
              {/* <StyledTableCell>
                <More />
              </StyledTableCell> */}
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  );
}
