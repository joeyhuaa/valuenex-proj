import React from 'react'
import { HiOutlineUpload } from 'react-icons/hi'
import { Text } from '@types/joeys-components'

export default function Upload({
  file,
  updateState,
}) {
  let handleFileLoad = () => {
    // store file in App state
    let file = document.getElementById('upload').files[0]

    // get array columns for processer
    let fr = new FileReader()
    fr.onload = function (e) {
      let text = e.target.result
      let firstLine = text.split('\n')[0]
      if (file.type === 'text/csv') {
        let cols = firstLine.split(',').map(c => c.trim())
        updateState(file, cols)
      } else if (file.type === 'text/tab-separated-values') {
        let cols = firstLine.split('\t').map(c => c.trim())
        updateState(file, cols)
      }
    }
    fr.readAsText(file)
  }

  return (
    <div>
      <Text>Upload your dataset and click next when you finish.</Text>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          border: 'solid 1px #9ea2a8',
          borderRadius: '3px',
          width: '500px',
          height: '300px',
          margin: '50px auto auto auto'
        }}
      >
        <HiOutlineUpload size={200} color='#008eff' />
        <div
          style={{
            paddingLeft: '55px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <input
            id='upload'
            type='file'
            accept='.csv, .tsv, .txt, .xls, .xlsx'
            onChange={handleFileLoad}
            style={{ color: 'transparent' }}
            onDrop={e => console.log('dropped')}
          />
          <label
            for='file'
            style={{ position: 'absolute', marginLeft: '60px', fontSize: '14px', textAlign: 'left', minWidth: '100px' }}
          >
            {file ? file.name : 'No file chosen'}
          </label>
        </div>
        <p className='mt-4' style={{ fontSize: '12px', color: '#9ea2a8' }}>Accepts .CSV, .TSV, .TXT, .XLS, .XLSX</p>
      </div>
    </div>
  )
}