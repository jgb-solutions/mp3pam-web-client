import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
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

import TextField from "../../components/TextField"
import TextIcon from "../../components/TextIcon"
import Routes from "../../routes"
import colors from "../../utils/colors"
import More from "../../components/More"
import Tabs, { TabItem } from "../../components/Tabs"
import AlbumTracksTable from "../../components/AlbumTracksTable"
import useAlbumDetail from '../../hooks/useAlbumDetail'
import Button from "../../components/Button"
import ListInterface, { SoundInterface } from "../../interfaces/ListInterface"
import * as playerActions from "../../store/actions/playerActions"
import AppStateInterface from "../../interfaces/AppStateInterface"
import { AlbumTrackInterface } from "../../interfaces/AlbumInterface"
import { Grid, Hidden } from "@material-ui/core"
import { SMALL_SCREEN_SIZE, APP_NAME, DOMAIN, SEO_ALBUM_TYPE, TWITTER_HANDLE } from "../../utils/constants"
import Spinner from "../../components/Spinner"
import { AlbumScrollingList } from "../../components/AlbumScrollingList"
import useRandomAlbums from "../../hooks/useRandomAlbums"
import SEO from "../../components/SEO"
import FourOrFour from "../../components/FourOrFour"
import HeaderTitle from "../../components/HeaderTitle"
import UploadButton from "../../components/UploadButton"
import useUpdateUser from "../../hooks/useUpdateUser"
import useFileUpload from "../../hooks/useFileUpload"
import AlertDialog from "../../components/AlertDialog"
import ProgressBar from "../../components/ProgressBar"
import CheckAuth from "../../components/CheckAuth"
import AlbumInterface from "../../interfaces/AlbumInterface"
import { StyledTableCell } from "../../components/AlbumTracksTable"


const useStyles = makeStyles(theme => ({
  row: {
    display: "flex",
    flexDirection: "row"
  },
  table: {
    width: '100%',
    marginTop: theme.spacing(3),
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
}))

type Props = {
  playList(list: ListInterface, sound?: SoundInterface): void
  pauseList(): void
  resumeList(): void
  playNext(soundList: SoundInterface[]): void
  addToQueue(soundList: SoundInterface[]): void
  isPlaying: boolean
  playingListHash: string
  currentTime: number
}

const AlbumEditScreen = (props: Props) => {
  const styles = useStyles()
  const params = useParams()
  const history = useHistory()
  const hash = get(params, 'hash')
  const [shouldEdit, setShouldEdit] = useState(false)

  const { data, loading, error } = useAlbumDetail(hash)
  const album = get(data, 'album')

  const makeList = () => {
    const { hash } = album

    const list: ListInterface = {
      hash,
      sounds: makeSoundList()
    }

    return list
  }

  const makeSoundList = () => {
    return album.tracks.map(({ hash, title, poster_url, audio_url }) => ({
      hash,
      title,
      image: poster_url,
      author_name: album.artist.stage_name,
      author_hash: album.artist.hash,
      play_url: audio_url,
      type: 'track',
    }))
  }

  const togglePlay = () => {
    if (props.isPlaying && props.playingListHash === album.hash) {
      props.pauseList()
    }

    if (!props.isPlaying && props.playingListHash === album.hash) {
      props.resumeList()
    }

    if (props.playingListHash !== album.hash) {
      props.playList(makeList())
    }
  }

  const confirmDelete = (hash: string) => {
    // setTrackHashToDelete(hash)
  }

  const handleDeleteAlbum = (hash: string) => {
    // deleteAlbum(hash)
  }

  // useEffect(() => {
  //   if (deleteAlbumResponse || errorDeletingAlbum) {
  //     setAlbumHashToDelete('')

  //     if (deleteAlbumResponse) {
  //       refetch()
  //     }
  //   }
  //   // eslint-disable-next-line
  // }, [deleteAlbumResponse, errorDeletingAlbum])


  if (loading) return <Spinner.Full />

  if (error) {
    return (<h1>Error loading album detail. Please reload page.</h1>)
  }

  const addTrackToAlbum = () => {

  }

  return (
    <CheckAuth className="react-transition flip-in-x-reverse">
      {album ? (
        <>
          <HeaderTitle
            icon={(
              <Avatar style={{ width: 75, height: 75 }} alt={album.title} src={album.cover_url} />
            )}
            textStyle={{ paddingLeft: 10 }}
            text={album.title}
          />
          <p>
            <i>Title</i>: <b>{album.title}</b>
          </p>

          <p>
            <i>Detail</i>: <b>{album.detail}</b>
          </p>

          <p>
            <i>Release Year</i>: <b>{album.release_year}</b>
          </p>

          <p>
            <Button
              size='large'
              onClick={addTrackToAlbum}>
              Add a New Track to This Album
              </Button>
          </p>

          {album.tracks.length ? (
            <>
              <HeaderTitle icon={<MusicNoteIcon />} text="Album Tracks" />

              <Table className={styles.table} size="small">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Title</StyledTableCell>
                    {/* <StyledTableCell>&nbsp;</StyledTableCell> */}
                    <StyledTableCell>&nbsp;</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {album.tracks.map((track: AlbumTrackInterface, index: number) => {
                    return (
                      <TableRow key={index} style={{
                        borderBottom: album.tracks.length - 1 === index ? '' : '1px solid white',
                      }}>
                        <StyledTableCell style={{ width: '80%' }}>
                          <Link to={Routes.track.detailPage(track.hash)} className={styles.link}>{track.title}</Link>
                        </StyledTableCell>
                        {/* <StyledTableCell style={{ width: '10%' }}>
                          <Link to={Routes.track.editPage(track.hash)} className={styles.link}>Edit</Link>
                        </StyledTableCell> */}
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
              <HeaderTitle icon={<MusicNoteIcon />} text="This album has no tracks yet" />
            )}
        </>
      ) : (
          <>
            <HeaderTitle icon={<FindReplaceIcon />} text="OOPS! The Album was not found." />
            <h3>
              Go to the <Link style={{ color: 'white' }} to={Routes.pages.home}>home page</Link>{' '}
              or
          {' '}
              <Link
                style={{ cursor: 'pointer', textDecoration: 'underline', color: colors.white }}
                to={Routes.browse.albums}>browse other albums.
          </Link>.
        </h3>
            <FourOrFour />
          </>
        )}
    </CheckAuth>
  )

}

export default connect(
  ({ player }: AppStateInterface) => ({
    playingListHash: get(player, 'list.hash'),
    isPlaying: player.isPlaying,
    currentTime: player.currentTime
  }),
  {
    playList: playerActions.playList,
    pauseList: playerActions.pauseList,
    resumeList: playerActions.resumeList,
    playNext: playerActions.playNext,
    addToQueue: playerActions.addToQueue,
  }
)(AlbumEditScreen)
