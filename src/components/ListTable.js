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

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function SimpleTable() {
  const classes = useStyles();

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
        {rows.map((row, index) => (
          <TableRow key={row.name} style={{
            borderBottom: rows.length - 1 === index ? '' : '1px solid white'
            }}>
            <StyledTableCell style={{ width: '15%' }}>
              <PlayPause /><Heart />
            </StyledTableCell>
            <StyledTableCell style={{ width: '30%' }}>{row.name}</StyledTableCell>
            <StyledTableCell style={{ width: '30%' }}>{row.name}</StyledTableCell>
            <StyledTableCell style={{ width: '20%' }}>{row.name}</StyledTableCell>
            <StyledTableCell>
              <More />
            </StyledTableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
