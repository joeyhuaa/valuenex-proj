import React from 'react'

export default function Footer({ style, children }) {
  return (
    <div id='footer' style={style}>
      {children}
    </div>
  )
}