import React from "react"
import MusicNoteIcon from '@material-ui/icons/MusicNote'

import HeaderTitle from "../../components/HeaderTitle"
// import { useSelector } from "react-redux";

// import ListTable from '../components/ListTable';
// import AppStateInterface from "../interfaces/AppStateInterface";

export default function ManageTracksScreen() {
  // const list = useSelector(({ player }: AppStateInterface) => player.list);

  return (
    <>
      <HeaderTitle icon={<MusicNoteIcon />} text="Your Tracks" />

      {/* {!list && <h3>Your queue is empty!</h3>} */}

    </>
  )
}

// import React, { useState } from "react"
// import AlbumIcon from '@material-ui/icons/Album'
// import { get } from "lodash-es"
// import { makeStyles } from '@material-ui/core/styles'
// import InfiniteScroll from 'react-infinite-scroller'
// import Table from '@material-ui/core/Table'
// import TableBody from '@material-ui/core/TableBody'
// import TableHead from '@material-ui/core/TableHead'
// import TableRow from '@material-ui/core/TableRow'
// import DialogContentText from '@material-ui/core/DialogContentText'
// import ErrorIcon from '@material-ui/icons/Error'

// import AlertDialog from "../../components/AlertDialog"
// import Spinner from "../../components/Spinner"
// import HeaderTitle from "../../components/HeaderTitle"
// import useAlbums from "../../hooks/useAlbums"
// import { StyledTableCell } from "../../components/AlbumTracksTable"
// import { AlbumPlainInterface } from "../../interfaces/AlbumInterface"
// import { Link } from "react-router-dom"
// import Routes from "../../routes"
// import Button from "../../components/Button"
// import colors from "../../utils/colors"
// import { DialogActions } from "@material-ui/core"

// const useStyles = makeStyles(theme => ({
//   table: {
//     width: '100%',
//     marginTop: theme.spacing(3),
//     overflowX: 'auto',
//   },
//   link: {
//     color: 'white',
//     fontWeight: 'bold'
//   },
//   errorColor: { color: colors.error },
// }))

// export default function ManageAlbumsScreen() {
//   const styles = useStyles()
//   const [openInvalidFileSize, setOpenInvalidFileSize] = useState('')
//   const { loading, error, data, loadMoreAlbums, hasMore } = useAlbums()
//   const albums = get(data, 'albums')

//   const confirmDelete = (hash: string) => {
//     setOpenInvalidFileSize(hash)
//   }

//   const deleteAlbum = (hash: string) => {
//     alert(`deleting album ${hash}`)
//   }

//   if (loading) return <Spinner.Full />

//   if (error) return <p>Error Loading new data. Please refresh the page.</p>

//   return (
//     <>
//       {albums.data.length ? (
//         <>
//           <HeaderTitle icon={<AlbumIcon />} text="Your Albums" />

//           <Table className={styles.table} size="small">
//             <TableHead>
//               <TableRow>
//                 <StyledTableCell>Title</StyledTableCell>
//                 <StyledTableCell>&nbsp;</StyledTableCell>
//                 <StyledTableCell>&nbsp;</StyledTableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {albums.data.map((album: AlbumPlainInterface, index: number) => {
//                 return (
//                   <TableRow key={index} style={{
//                     borderBottom: albums.data.length - 1 === index ? '' : '1px solid white',
//                   }}>
//                     <StyledTableCell style={{ width: '80%' }}>
//                       <Link to={Routes.album.detailPage(album.hash)} className={styles.link}>{album.title}</Link>
//                     </StyledTableCell>
//                     <StyledTableCell style={{ width: '10%' }}>
//                       <Link to={Routes.album.editPage(album.hash)} className={styles.link}>Edit</Link>
//                     </StyledTableCell>
//                     <StyledTableCell style={{ width: '10%' }}>
//                       <span
//                         onClick={() => confirmDelete(album.hash)}
//                         className={styles.link}
//                         style={{ cursor: 'pointer' }}>Delete</span>
//                     </StyledTableCell>
//                   </TableRow>
//                 )
//               })}
//             </TableBody>
//           </Table>
//           <InfiniteScroll
//             pageStart={1}
//             loadMore={loadMoreAlbums}
//             hasMore={hasMore}
//             loader={<Spinner key={1} />}
//             useWindow={false}
//           >
//             {/* <Grid container spacing={2}>
//               <ManageAlbumTable albums={albums.data} />
//             </Grid> */}
//           </InfiniteScroll>
//         </>
//       ) : (
//           <HeaderTitle icon={<AlbumIcon />} text="You have no albums yet" />
//         )}

//       {/* Invalid File Size Dialog */}
//       <AlertDialog
//         open={!!openInvalidFileSize}
//         handleClose={() => setOpenInvalidFileSize('')}>
//         <DialogContentText align='center'>
//           <HeaderTitle icon={<ErrorIcon className={styles.errorColor} />} text={`Are you sure you want to delete this album?`} />
//         </DialogContentText>
//         <DialogActions>
//           <Button size='small' onClick={() => setOpenInvalidFileSize('')} color="primary">
//             Cancel
//           </Button>
//           <Button size='small' onClick={() => deleteAlbum(openInvalidFileSize)} color="primary">
//             OK
//           </Button>
//         </DialogActions>
//       </AlertDialog>
//     </>
//   )
// }
