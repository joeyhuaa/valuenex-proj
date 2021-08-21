import React from 'react'
import { HiOutlineUpload } from 'react-icons/hi'
import { Text, FancyFileInput } from '@types/joeys-components'

export default function Upload({
  file,
  updateState,
}) {
  let handleFileLoad = (files) => {
    // store file in App state
    let file = files[0]

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
        <FancyFileInput 
          onChange={handleFileLoad}
          accept='.csv, .tsv, .txt, .xls, .xlsx'
          icon={<HiOutlineUpload size={200} color='#008eff' />}
        />
        <p>{file ? file.name : 'No file chosen'}</p>
        <p className='mt-4' style={{ fontSize: '12px', color: '#9ea2a8' }}>Accepts .CSV, .TSV, .TXT, .XLS, .XLSX</p>
      </div>
    </div>
  )
}