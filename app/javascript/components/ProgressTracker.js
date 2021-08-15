import React from 'react'
import { StatusTracker, Text } from '@types/joeys-components' 

export default function ProgressTracker({
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

  let state = view => {
    if (view === currView) return 'active'
    else if (views().includes(view)) return 'completed'
    else return 'incomplete'
  }

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: '100px',
      borderBottom: 'solid #dadada 1px'
    }}>
      <Text type='emphasis' style={{ width: '300px' }}>{viewLabelMap[currView]}</Text>
      <StatusTracker 
        completeBackgroundColor='#008eff'
        borderCompleteColor='#008eff'
        labelSize={12}
        steps={[
          {
            label: 'Upload Dataset',
            state: state('upload')
          },
          {
            label: 'Adjust Settings',
            state: state('processer')
          },
          {
            label: 'Confirm Details',
            state: state('validation')
          },
        ]}
      />
    </div>
  )
}