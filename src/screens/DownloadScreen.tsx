import React from "react"
import { useParams } from "react-router-dom"

import Logo from "../components/Logo"
import Download from "../components/Download"
import { get } from "lodash-es"


export interface Credentials {
  email: string
  password: string
}


export default function DownloadScreen() {
  const params = useParams()
  const hash = get(params, 'hash')
  const type = get(params, 'type')

  return (
    <div style={{ maxWidth: 450, margin: '0 auto', textAlign: 'center' }}>
      <Logo size={300} />

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Download type={type} hash={hash} />
      </div>
    </div>
  )
}