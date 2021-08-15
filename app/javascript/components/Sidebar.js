import React from 'react'
import { Text } from '@types/joeys-components'
import { useUploads, useDeleteData } from '../hooks'

import { Link } from 'react-router-dom'
import { RotateCircleLoading } from 'react-loadingg'

export default function Sidebar() {
  const { data, isLoading, isFetching } = useUploads();
  const _useDeleteData = useDeleteData();

  return (
    <div 
      id='uploads-sidebar'
      style={{
        borderRight: 'solid #dadada 1px',
        width: '250px',
        minWidth: '250px',
        whiteSpace: 'pre-wrap',
        overflowY: 'auto',
        height: '100vh',
        paddingTop: '20px'
      }}
    >
      <div className='df mb-24 mt-12'>
        <Text type='emphasis' className='ml-16'>Your Uploads</Text>
        {(isLoading || isFetching) && (
          <div style={{ 
            position: 'relative', 
            flex: 1,
          }}>
            <RotateCircleLoading size='small' color='#008eff' />
          </div>
        )}
      </div>

      {data?.uploads?.map((d, i) => {
        let included_cols = Object.keys(d?.included_data?.[0])
        let assigned_cols = Object.entries(d?.assigned_data?.[0])
        return (
          <Link to={`/data/${d.id}`} key={`data-${i}`}>
            <div
              className='upload upload-clickable'
              tabIndex='0'
            >
              <Text type='subtle' style={{ color: '#008eff' }}>#{d.id}</Text>

              <Text type='subtle' className='mt-12'>Filename:</Text>
              <Text>{d?.filename}</Text>

              <Text type='subtle' className='mt-12'>Included Columns:</Text>
              {included_cols?.map(i => <Text>{i}</Text>)}

              <Text type='subtle' className='mt-12'>Assigned Columns:</Text>
              {assigned_cols?.map(a => (
                <Text style={{ width: '170px' }}>
                  {a[0]}: <Text type='input' style={{ float: 'right' }}>{a[1][0]}</Text>
                </Text>
              ))}
            </div>
          </Link>
        )
      })}
    </div>
  )
}