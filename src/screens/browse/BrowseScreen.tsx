import React from "react"
import { get } from "lodash-es"
import { Grid } from "@material-ui/core"
import FolderOpenIcon from '@material-ui/icons/FolderOpen'

import Spinner from "../../components/Spinner"
import HeaderTitle from "../../components/HeaderTitle"
import useGenres from "../../hooks/useGenres"
import GenreThumbnail, { GenreInterface } from "../../components/GenreThumbnail"
import SEO from "../../components/SEO"

export default function BrowseScreen() {
  const { loading, error, data } = useGenres()
  const genres = get(data, 'genres')

  if (loading) return <Spinner.Full />

  if (error) return <p>Error Loading new data. Please refresh the page.</p>

  return (
    <>
      <HeaderTitle icon={<FolderOpenIcon />} text="Browse Genres" />
      <SEO title={`Browse Genres`} />

      <Grid container spacing={2}>
        {genres.map((genre: GenreInterface) => (
          <Grid item xs={6} md={3} sm={4} key={genre.slug}>
            <GenreThumbnail genre={genre} />
          </Grid>
        ))}
      </Grid>
    </>
  )
}