import React, { useState, useEffect } from "react"
import MusicNoteIcon from '@material-ui/icons/MusicNote'
import { get } from "lodash-es"
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import ErrorIcon from '@material-ui/icons/Error'
import DialogActions from "@material-ui/core/DialogActions"

import AlertDialog from "../../components/AlertDialog"
import Spinner from "../../components/Spinner"
import HeaderTitle from "../../components/HeaderTitle"
import useMyTracks from "../../hooks/useMyTracks"
import { StyledTableCell } from "../../components/AlbumTracksTable"
import { Link } from "react-router-dom"
import Routes from "../../routes"
import Button from "../../components/Button"
import colors from "../../utils/colors"
import useDeleteTrack from "../../hooks/useDeleteTrack"
import SEO from "../../components/SEO"

const useStyles = makeStyles(theme => ({
  table: {
    width: '100%',
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

export default function ManageTracksScreen() {
  const styles = useStyles()
  const [trackHashToDelete, setTrackHashToDelete] = useState('')
  const { deleteTrack, deleteTrackResponse, deletingTrack, errorDeletingTrack } = useDeleteTrack()
  const { loading, error, data, refetch } = useMyTracks()
  const tracks = get(data, 'me.tracks')

  const confirmDelete = (hash: string) => {
    setTrackHashToDelete(hash)
  }

  const handleDeleteTrack = (hash: string) => {
    deleteTrack(hash)
  }

  useEffect(() => {
    if (deleteTrackResponse || errorDeletingTrack) {
      setTrackHashToDelete('')

      if (deleteTrackResponse) {
        refetch()
      }
    }
    // eslint-disable-next-line
  }, [deleteTrackResponse, errorDeletingTrack])

  if (loading) return <Spinner.Full />

  if (error) return <p>Error Loading new data. Please refresh the page.</p>

  return (
    <>
      {tracks.data.length ? (
        <>
          <HeaderTitle icon={<MusicNoteIcon />} text="Your Tracks" />
          <SEO title={`Your Tracks`} />

          <Table className={styles.table} size="small">
            <TableHead>
              <TableRow>
                <StyledTableCell>Title</StyledTableCell>
                <StyledTableCell>&nbsp;</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tracks.data.map((track: { hash: string, title: string }, index: number) => {
                return (
                  <TableRow key={index} style={{
                    borderBottom: tracks.data.length - 1 === index ? '' : '1px solid white',
                  }}>
                    <StyledTableCell style={{ width: '90%' }}>
                      <Link to={Routes.track.detailPage(track.hash)} className={styles.link}>{track.title}</Link>
                    </StyledTableCell>
                    <StyledTableCell style={{ width: '10%' }}>
                      <span
                        onClick={() => confirmDelete(track.hash)}
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
          <HeaderTitle icon={<MusicNoteIcon />} text="You have no tracks yet" />
        )}

      {/* Deletion confirmation */}
      <AlertDialog
        open={!!trackHashToDelete}
        handleClose={() => setTrackHashToDelete('')}>
        <HeaderTitle
          textStyle={{ fontSize: 13 }}
          icon={<ErrorIcon className={styles.errorColor} />}
          text={`Are you sure you want to delete this track?`} />
        <DialogActions>
          <Button size='small' onClick={() => setTrackHashToDelete('')}>
            Cancel
          </Button>
          <Button
            size='small'
            onClick={() => handleDeleteTrack(trackHashToDelete)}
            className={styles.noBgButton}
            disabled={deletingTrack}>
            Delete
          </Button>
        </DialogActions>
      </AlertDialog>
    </>
  )
}
