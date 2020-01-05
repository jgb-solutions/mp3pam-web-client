import React from "react"
import { useSelector } from "react-redux"
import QueueMusicIcon from '@material-ui/icons/QueueMusic'

import QueueTable from '../../components/QueueTable'
import AppStateInterface from "../../interfaces/AppStateInterface"
import SEO from "../../components/SEO"
import HeaderTitle from "../../components/HeaderTitle"

function QueueScreen() {
  const list = useSelector(
    ({ player: { list } }: AppStateInterface) => list
  )

  return (
    <>
      <HeaderTitle icon={<QueueMusicIcon />} text="Your Current Queue" />
      <SEO title={`Your Current Queue`} />

      {!list && <h3>Your queue is empty!</h3>}

      <QueueTable />
    </>
  )
}

export default QueueScreen