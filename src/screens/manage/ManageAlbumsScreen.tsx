import React from "react"
import AlbumIcon from '@material-ui/icons/Album'
import { get } from "lodash-es"
import { makeStyles } from '@material-ui/core/styles'
import InfiniteScroll from 'react-infinite-scroller'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

import Spinner from "../../components/Spinner"
import HeaderTitle from "../../components/HeaderTitle"
import useAlbums from "../../hooks/useAlbums"
import { StyledTableCell } from "../../components/AlbumTracksTable"
import { AlbumPlainInterface } from "../../interfaces/AlbumInterface"
import { Link } from "react-router-dom"
import Routes from "../../routes"

const useStyles = makeStyles(theme => ({
  table: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  link: {
    color: 'white',
    fontWeight: 'bold'
  }
}))

export default function ManageAlbumsScreen() {
  const styles = useStyles()
  const { loading, error, data, loadMoreAlbums, hasMore } = useAlbums()
  const albums = get(data, 'albums')

  const confirmDelete = (hash: string) => {
    alert(hash)
  }

  if (loading) return <Spinner.Full />

  if (error) return <p>Error Loading new data. Please refresh the page.</p>

  return (
    <>
      {albums.data.length ? (
        <>
          <HeaderTitle icon={<AlbumIcon />} text="Your Albums" />

          <Table className={styles.table} size="small">
            <TableHead>
              <TableRow>
                <StyledTableCell>Title</StyledTableCell>
                <StyledTableCell>&nbsp;</StyledTableCell>
                <StyledTableCell>&nbsp;</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {albums.data.map((album: AlbumPlainInterface, index: number) => {
                return (
                  <TableRow key={index} style={{
                    borderBottom: albums.data.length - 1 === index ? '' : '1px solid white',
                  }}>
                    <StyledTableCell style={{ width: '80%' }}>
                      <Link to={Routes.album.detailPage(album.hash)} className={styles.link}>{album.title}</Link>
                    </StyledTableCell>
                    <StyledTableCell style={{ width: '10%' }}>
                      <Link to={Routes.album.editPage(album.hash)} className={styles.link}>Edit</Link>
                    </StyledTableCell>
                    <StyledTableCell style={{ width: '10%' }}>
                      <span
                        onClick={() => confirmDelete(album.hash)}
                        className={styles.link}
                        style={{ cursor: 'pointer' }}>Delete</span>
                    </StyledTableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
          <InfiniteScroll
            pageStart={1}
            loadMore={loadMoreAlbums}
            hasMore={hasMore}
            loader={<Spinner key={1} />}
            useWindow={false}
          >
            {/* <Grid container spacing={2}>
              <ManageAlbumTable albums={albums.data} />
            </Grid> */}
          </InfiniteScroll>
        </>
      ) : (
          <HeaderTitle icon={<AlbumIcon />} text="You have no albums yet" />
        )}
    </>
  )
}
