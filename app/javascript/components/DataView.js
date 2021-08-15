import React from 'react'
import { useGetData } from '../hooks'
import { Text } from '@types/joeys-components'
import { SolarSystemLoading } from 'react-loadingg'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'

export default function DataView() {
  const { id } = useParams()
  let { data, isLoading, error } = useGetData(id)
  data = data?.data

  return (
    <div id='data-viewer'>
      {error && <Text>Error.</Text>}
      {isLoading && 
        <div className='center-center'>
          <SolarSystemLoading 
            size='large' 
            color='#008eff' 
            style={{ position: 'relative' }}
          />
        </div>
      }
      {data &&
        <div id='screen'>
          <Link to='/upload'>
            <button className='back-btn' id='back-home'>
              Home
            </button>
          </Link>
          <Text>
            {data.filename}
          </Text>
        </div>
      }
    </div>
  )
}