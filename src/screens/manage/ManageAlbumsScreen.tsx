import React, { useState, useEffect } from "react"
import AlbumIcon from '@material-ui/icons/Album'
import { get } from "lodash-es"
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import DialogContentText from '@material-ui/core/DialogContentText'
import ErrorIcon from '@material-ui/icons/Error'

import AlertDialog from "../../components/AlertDialog"
import Spinner from "../../components/Spinner"
import HeaderTitle from "../../components/HeaderTitle"
import useMyAlbums from "../../hooks/useMyAlbums"
import { StyledTableCell } from "../../components/AlbumTracksTable"
import { AlbumPlainInterface } from "../../interfaces/AlbumInterface"
import { Link } from "react-router-dom"
import Routes from "../../routes"
import Button from "../../components/Button"
import colors from "../../utils/colors"
import { DialogActions } from "@material-ui/core"
import useDeleteAlbum from "../../hooks/useDeleteAlbum"

const useStyles = makeStyles(theme => ({
  table: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  link: {
    color: 'white',
    fontWeight: 'bold'
  },
  errorColor: { color: colors.error },
  noBgButton: {
    backgroundColor: colors.contentGrey,
    border: `1px solid ${colors.primary}`
  },
}))

export default function ManageAlbumsScreen() {
  const styles = useStyles()
  const [albumHashToDelete, setAlbumHashToDelete] = useState('')
  const { deleteAlbum, deleteAlbumResponse, deletingAlbum, errorDeletingAlbum } = useDeleteAlbum()
  const { loading, error, data, refetch } = useMyAlbums()
  const albums = get(data, 'me.albums')

  const confirmDelete = (hash: string) => {
    setAlbumHashToDelete(hash)
  }

  const handleDeleteAlbum = (hash: string) => {
    deleteAlbum(hash)
  }

  useEffect(() => {
    if (deleteAlbumResponse || errorDeletingAlbum) {
      setAlbumHashToDelete('')

      if (deleteAlbumResponse) {
        refetch()
      }
    }
    // eslint-disable-next-line
  }, [deleteAlbumResponse, errorDeletingAlbum])

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
        </>
      ) : (
          <HeaderTitle icon={<AlbumIcon />} text="You have no albums yet" />
        )}

      {/* Invalid File Size Dialog */}
      <AlertDialog
        open={!!albumHashToDelete}
        handleClose={() => setAlbumHashToDelete('')}>
        <HeaderTitle
          textStyle={{ fontSize: 13 }}
          icon={<ErrorIcon className={styles.errorColor} />}
          text={`Are you sure you want to delete this album?`} />
        <DialogContentText align='center'>
        </DialogContentText>
        <DialogActions>
          <Button size='small' onClick={() => setAlbumHashToDelete('')}>
            Cancel
          </Button>
          <Button
            size='small'
            onClick={() => handleDeleteAlbum(albumHashToDelete)}
            className={styles.noBgButton}
            disabled={deletingAlbum}>
            Delete
          </Button>
        </DialogActions>
      </AlertDialog>
    </>
  )
}
