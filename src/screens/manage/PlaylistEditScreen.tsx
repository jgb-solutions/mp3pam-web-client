import React, { useEffect, useState } from "react"
import { darken, makeStyles } from "@material-ui/core/styles"
import { Link, useParams, useHistory } from "react-router-dom"
import { get } from 'lodash'
import FindReplaceIcon from '@material-ui/icons/FindReplace'
import MusicNoteIcon from '@material-ui/icons/MusicNote'
import Avatar from '@material-ui/core/Avatar'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import DialogActions from "@material-ui/core/DialogActions"
import ErrorIcon from '@material-ui/icons/Error'
import useForm from "react-hook-form"
import { Grid } from "@material-ui/core"
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered'

import TextField from "../../components/TextField"
import Routes from "../../routes"
import colors from "../../utils/colors"
import usePlaylistDetail from '../../hooks/usePlaylistDetail'
import Button from "../../components/Button"
import { PlaylistTrackInterface } from "../../interfaces/PlaylistInterface"
import { SMALL_SCREEN_SIZE, } from "../../utils/constants"
import Spinner from "../../components/Spinner"
import useAddTrackToPlaylist from "../../hooks/useAddTrackToPlaylist"
import FourOrFour from "../../components/FourOrFour"
import HeaderTitle from "../../components/HeaderTitle"
import AlertDialog from "../../components/AlertDialog"
import CheckAuth from "../../components/CheckAuth"
import { StyledTableCell } from "../../components/PlaylistTracksTable"
import useDeletePlaylistTrack from "../../hooks/useDeletePlaylistTrack"
import useMyPlaylists from "../../hooks/useMyPlaylists"
import useCreatePlaylist from "../../hooks/useCreatePlaylist"
import SEO from "../../components/SEO"


const useStyles = makeStyles(theme => ({
  row: {
    display: "flex",
    flexDirection: "row"
  },
  table: {
    width: '100%',
    overflowX: 'auto',
  },
  imageContainer: {
    textAlign: 'center',
  },
  image: {
    width: 250,
    height: 'auto',
    maxWidth: "100%",
  },
  listByAuthor: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  link: {
    color: 'white',
    fontWeight: 'bold'
  },
  listBy: {
    color: darken(colors.white, 0.5),
    fontSize: 12
  },
  listAuthor: {
    textDecoration: "none",
    color: colors.white,
    "&:hover": {
      textDecoration: "underline"
    },
    "&:link": {
      textDecoration: "none",
      color: "white"
    }
  },
  detailsWrapper: {
    [theme.breakpoints.up(SMALL_SCREEN_SIZE)]: {
      position: 'relative',
    },
  },
  listDetails: {
    [theme.breakpoints.up(SMALL_SCREEN_SIZE)]: {
      position: 'absolute',
      bottom: 4,
    },
    "& > *": {
      padding: 0,
      margin: 0
    },
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center',
    },
  },
  listType: {
    fontSize: 12,
    fontWeight: 400,
    textTransform: "uppercase"
  },
  listName: {
    fontSize: 36,
    fontWeight: "bold",
    [theme.breakpoints.down('xs')]: {
      fontSize: 32,
    },
  },
  ctaButtons: {
    marginTop: 10,
  },
  errorColor: { color: colors.error },
  noBgButton: {
    backgroundColor: colors.contentGrey,
    border: `1px solid ${colors.primary}`
  },
}))

export const CreatePlaylistForm = ({ onPlaylistCreate, playlists }: {
  onPlaylistCreate: (hash: string) => void,
  playlists: { title: string }[]
}) => {
  const styles = useStyles()
  const { createPlaylist, data, loading, error } = useCreatePlaylist()
  const {
    register,
    handleSubmit,
    errors
  } = useForm<{ title: string }>({ mode: 'onBlur' })

  useEffect(() => {
    if (data) {
      console.log(data)
      onPlaylistCreate(data.CreatePlaylist.hash)
    }
    // eslint-disable-next-line
  }, [data])

  const handleCreatePlaylist = ({ title }: { title: string }) => {
    createPlaylist(title)
  }

  if (loading) return <Spinner.Full />

  if (error) {
    return (<h3>Error creating the playlist. Please reload page.</h3>)
  }

  return (
    <>
      <form onSubmit={handleSubmit(handleCreatePlaylist)} noValidate>
        <Grid container direction='row' spacing={2}>
          <Grid item xs={8}>
            <TextField
              inputRef={register({
                required: "The title of the playlist is required.",
                validate: {
                  should_not_already_exists: value =>
                    !playlists.map(playlists => playlists.title).find(title => title === value) ||
                    `A playlist with the same  already exists.`
                }
              })}
              name="title"
              id="title"
              type="text"
              error={!!errors.title}
              helperText={errors.title && (
                <span className={styles.errorColor}>{errors.title.message}</span>
              )}
            />
          </Grid>
          <Grid item xs={4}>
            <Button size='small' type="submit">Create</Button>
          </Grid>
        </Grid>
      </form>
    </>
  )
}

export const AddTrackToPlaylist = ({ trackHash, onRequestClose }: {
  trackHash: string,
  onRequestClose: () => void,
}) => {
  const styles = useStyles()
  const [openCreatePlaylistPopup, setOpenCreatePlaylistPopup] = useState(false)
  const {
    addTrackToPlaylist,
    data: addTrackToPlaylistResponse,
    loading: addingTrackToPlaylist,
    error: errorAddingTrackToPlaylist
  } = useAddTrackToPlaylist()
  const { loading, error, data } = useMyPlaylists()
  const playlists = get(data, 'me.playlists.data')

  useEffect(() => {
    if (addTrackToPlaylistResponse) {
      onRequestClose()
    }
    // eslint-disable-next-line
  }, [addTrackToPlaylistResponse])

  const handleAddTrackToPlaylist = (playlistHash: string) => {
    addTrackToPlaylist(playlistHash, trackHash)
  }

  if (loading) return <Spinner.Full />

  if (addingTrackToPlaylist) return <Spinner.Full />

  if (error) {
    return (<h3>Error loading your tracks. Please reload page.</h3>)
  }

  if (errorAddingTrackToPlaylist) {
    return (<h3>Error adding the track to the playlist.</h3>)
  }

  return (
    <AlertDialog
      open={true}
      handleClose={onRequestClose}>
      <HeaderTitle
        textStyle={{ fontSize: 15 }}
        icon={<FormatListNumberedIcon />}
        text={`Choose from your playlists or create a new one`}
      />

      <p>
        <Button
          size='large'
          onClick={() => setOpenCreatePlaylistPopup(true)}>
          Create a new playlist
        </Button>
      </p>

      {openCreatePlaylistPopup && (
        <CreatePlaylistForm
          playlists={playlists}
          onPlaylistCreate={handleAddTrackToPlaylist}
        />
      )}

      {/* {!openCreatePlaylistPopup ? (

      ) : null } */}
      {playlists ? (
        <>
          <HeaderTitle icon={<FormatListNumberedIcon />} text="Your Playlists" />

          <Table className={styles.table} size="small">
            <TableBody>
              {playlists.map((playlist: { hash: string, title: string }, index: number) => {
                return (
                  <TableRow key={index} style={{
                    borderBottom: playlists.length - 1 === index ? '' : '1px solid white',
                  }}>
                    <StyledTableCell style={{ width: '80%' }}>
                      {playlist.title}
                    </StyledTableCell>
                    <StyledTableCell style={{ width: '10%' }}>
                      <span
                        onClick={() => {
                          if (addingTrackToPlaylist) return

                          handleAddTrackToPlaylist(playlist.hash)
                        }}
                        className={styles.link}
                        style={{ cursor: 'pointer' }}>Add</span>
                    </StyledTableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </>
      ) : (
          <HeaderTitle icon={<FormatListNumberedIcon />} text="You have no playlists yet" />
        )}

      <DialogActions>
        <Button
          size='small'
          onClick={onRequestClose}
          className={styles.noBgButton}>
          Cancel
          </Button>
      </DialogActions>
    </AlertDialog >
  )
}

export default function PlaylistEditScreen() {
  const styles = useStyles()
  const params = useParams()
  const history = useHistory()
  const hash = get(params, 'hash')
  const [trackHashToDelete, setTrackHashToDelete] = useState('')
  const {
    deletePlaylistTrack,
    deletePlaylistTrackResponse,
    deletingPlaylistTrack,
    errorDeletingPlaylistTrack
  } = useDeletePlaylistTrack()

  const { data, loading, error, refetch } = usePlaylistDetail(hash)
  const playlist = get(data, 'playlist')

  const confirmDelete = (hash: string) => {
    setTrackHashToDelete(hash)
  }

  const handleDeletePlaylistTrack = (trackHash: string) => {
    deletePlaylistTrack(trackHash, playlist.hash)
  }

  useEffect(() => {
    if (deletePlaylistTrackResponse || errorDeletingPlaylistTrack) {
      setTrackHashToDelete('')

      if (deletePlaylistTrackResponse) {
        refetch()
      }
    }
    // eslint-disable-next-line
  }, [deletePlaylistTrackResponse, errorDeletingPlaylistTrack])

  if (loading) return <Spinner.Full />

  if (error) {
    return (<h1>Error loading playlist detail. Please reload page.</h1>)
  }

  return (
    <CheckAuth className="react-transition flip-in-x-reverse">
      <SEO title={`Edit Playlist`} />

      {playlist ? (
        <>
          <HeaderTitle
            onClick={() => history.push(Routes.playlist.detailPage(playlist.hash))}
            icon={(
              <Avatar style={{ width: 75, height: 75 }} alt={playlist.title} src={playlist.coverUrl} />
            )}
            textStyle={{ paddingLeft: 10 }}
            text={playlist.title}
          />

          {playlist.tracks.length ? (
            <>
              <HeaderTitle icon={<MusicNoteIcon />} text="Playlist Tracks" />

              <Table className={styles.table} size="small">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Title</StyledTableCell>
                    <StyledTableCell>Artist</StyledTableCell>
                    {/* <StyledTableCell>&nbsp;</StyledTableCell> */}
                    <StyledTableCell>&nbsp;</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {playlist.tracks.map((track: PlaylistTrackInterface, index: number) => {
                    return (
                      <TableRow key={index} style={{
                        borderBottom: playlist.tracks.length - 1 === index ? '' : '1px solid white',
                      }}>
                        <StyledTableCell style={{ width: '40%' }}>
                          <Link to={Routes.track.detailPage(track.hash)} className={styles.link}>{track.title}</Link>
                        </StyledTableCell>
                        <StyledTableCell style={{ width: '40%' }}>
                          <Link to={Routes.artist.detailPage(track.artist.hash)} className={styles.link}>{track.artist.stage_name}</Link>
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
              <>
                <HeaderTitle icon={<MusicNoteIcon />} text="This playlist has no tracks yet" />
                <p><Link style={{ color: 'white' }} to={Routes.browse.tracks}>Start browsing</Link> some tracks to add to your playlist.</p>
              </>
            )}
        </>
      ) : (
          <>
            <HeaderTitle icon={<FindReplaceIcon />} text="OOPS! The Playlist was not found." />
            <h3>
              Go to the <Link style={{ color: 'white' }} to={Routes.pages.home}>home page</Link>{' '}
              or
          {' '}
              <Link
                style={{ cursor: 'pointer', textDecoration: 'underline', color: colors.white }}
                to={Routes.browse.playlists}>browse other playlists.
          </Link>.
        </h3>
            <FourOrFour />
          </>
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
            onClick={() => handleDeletePlaylistTrack(trackHashToDelete)}
            className={styles.noBgButton}
            disabled={deletingPlaylistTrack}>
            Delete
          </Button>
        </DialogActions>
      </AlertDialog>
    </CheckAuth>
  )
}