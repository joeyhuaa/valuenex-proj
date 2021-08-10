import React from 'react'

export default function Sidebar({ data }) {
  return (
    <div style={{
      borderRight: 'solid #dadada 2px',
      width: '200px',
      minWidth: '200px',
      whiteSpace: 'pre-wrap',
      overflowY: 'scroll',
      height: '100vh',
      paddingRight: '10px',
      paddingTop: '20px'
    }}>
      <h3>Your Uploads</h3>
      {data?.map((d, i) => {
        let included_cols = Object.keys(d?.included_data[0])
        let assigned_cols = Object.entries(d?.assigned_data[0])
        return (
          <div
            key={`data-${i}`}
            id='uploads-sidebar'
            style={{
              borderBottom: 'solid #dadada 1px',
              paddingTop: '15px',
              paddingBottom: '10px',
              lineHeight: '5px'
            }}
          >
            <span style={{ color: '#008eff' }}>#{d.id}</span>
            <h5>Filename:</h5>
            <span>{d?.filename}</span>
            <h5>Included Columns:</h5>
            {included_cols?.map(i => <span style={{ marginTop: '12px' }}>{i}</span>)}
            <h5>Assigned Columns:</h5>
            {assigned_cols?.map(a => <p style={{ width: '170px' }}>{a[0]}: <span style={{ float: 'right' }}>{a[1][0]}</span></p>)}
          </div>
        )
      })}
    </div>
  )
}