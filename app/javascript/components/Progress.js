import React from 'react'
import { StatusTracker, Text } from '@types/joeys-components' 

export default function Progress({
  currView,
}) {
  let viewLabelMap = {
    'upload': 'Upload Dataset',
    'processer': 'Adjust Settings',
    'validation': 'Confirm Details'
  }

  let views = () => {
    if (currView === 'upload') return ['upload']
    if (currView === 'processer') return ['upload', 'processer']
    if (currView === 'validation') return ['upload', 'processer', 'validation']
    return []
  }

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: '100px',
      borderBottom: 'solid #dadada 1px'
    }}>
      <Text type='jumbo' style={{ width: '300px' }}>{viewLabelMap[currView]}</Text>
      <StatusTracker 
        labelSize={12}
        steps={[
          {
            label: 'Upload Dataset',
            state: views().includes('upload') ? 'completed' : 'incomplete'
          },
          {
            label: 'Adjust Settings',
            state: views().includes('processer') ? 'completed' : 'incomplete'
          },
          {
            label: 'Confirm Details',
            state: views().includes('validation') ? 'completed' : 'incomplete'
          },
        ]}
      />
    </div>
  )
}