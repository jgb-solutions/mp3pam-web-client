import React from "react"
import { useSelector } from "react-redux"

import QueueTable from '../../components/QueueTable'
import AppStateInterface from "../../interfaces/AppStateInterface"

function QueueScreen() {
  const list = useSelector(
    ({ player: { list } }: AppStateInterface) => list
  )

  return (
    <>
      <h1>Your Current Queue</h1>

      {!list && <h3>Your queue is empty!</h3>}

      <QueueTable />
    </>
  )
}

export default QueueScreen