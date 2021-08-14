import React from 'react'
import { AiOutlineCheck } from 'react-icons/ai'
import { StatusTracker } from '@types/joeys-components' 

let circleStyle = {
  height: '12px',
  width: '12px',
  borderRadius: '50%',
  border: 'solid gray 1px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}

let circleCurrStyle = {
  ...circleStyle,
  border: 'solid #008eff 1px',
  backgroundColor: '#008eff'
}

let labelStyle = {
  fontSize: '10px'
}

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
      <h1 style={{ width: '300px' }}>{viewLabelMap[currView]}</h1>
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
          }
        ]}
      />
    </div>
  )
}