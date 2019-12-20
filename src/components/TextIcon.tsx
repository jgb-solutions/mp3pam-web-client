import React, { ReactNode } from 'react'

export default function TextIcon({ icon, text }: { icon?: ReactNode, text: string | ReactNode }) {
  return (
    <span style={{ display: 'flex', alignItems: 'center' }}>
      <span>{icon}</span>
      <span>&nbsp;{text}</span>
    </span>
  )
}