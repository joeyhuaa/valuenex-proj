import React, { useState, useEffect } from 'react'
import { Route, Link, Redirect } from 'react-router-dom'

import ProgressTracker from './ProgressTracker'
import Upload from './Upload'
import Processer from './Processer'
import Validation from './Validation'
import Footer from './Footer'

import { useCreateData } from '../hooks'

const papa = require('papaparse')

export default function UploadBody({
  
}) {
  const _useCreateData = useCreateData()

  const [state, setState] = useState({
		file: null,
		cols: [],
		view: 'upload',
		includedCols: [],
		assignedCols: { 'ID': null, 'Name': null, 'Timestamp': null },
		assignableCols: [],
		canUpload: false,
		timeStampInvalid: true
	})

	useEffect(() => {
		setState({
			...state,
			assignedCols: { 'ID': null, 'Name': null, 'Timestamp': null }
		})
	}, [state.file])

	const handleUpload = () => {

		let filterIncludedCols = data => {
			let obj = {}
			Object.keys(data).forEach(col => { if (state.includedCols.includes(col)) obj[col] = data[col] })
			return obj
		}

		let filterAssignedCols = data => {
			let obj = {}
			let pairs = Object.entries(state.assignedCols).flat()
			Object.keys(data).forEach(col => {
				if (pairs.includes(col)) {
					let i = pairs.findIndex(x => x === col) // find the index of col in pairs
					let assigned_key = pairs[i - 1] // the previous element will be the assigned key
					obj[assigned_key] = [col, data[col]]
				}
			})
			return obj
		}

    // post 
		let post = (includedData, assignedData) => {
			console.log(state.file)
			_useCreateData.mutate({
				filename: state.file.name,
				included_data: JSON.stringify(includedData),
				assigned_data: JSON.stringify(assignedData)
			})
		}

		// parse, filter, store in includedData and assignedData
		let includedData = [], assignedData = [] // arr of objs
		papa.parse(state.file, {
			header: true,
			step: (row) => {
				// filter the data and push 
				includedData.push( filterIncludedCols(row.data) )
				assignedData.push( filterAssignedCols(row.data) )
			},
			complete: () => post(includedData, assignedData)
		})

		// reset state
		setState({
			file: null,
			view: 'upload',
			cols: [],
			includedCols: [],
			assignedCols: { 'ID': null, 'Name': null, 'Timestamp': null },
			assignableCols: [],
			canUpload: false,
			timeStampInvalid: true
		})
	}

	const uploadSetState = (file, cols) => setState({ ...state, file: file, cols: cols, includedCols: cols, assignableCols: cols })

	const processSetState = (ic, ac, ac2) => setState({ ...state, includedCols: ic, assignedCols: ac, assignableCols: ac2 })

	const validateSetState = (cu, tsi) => setState({ ...state, canUpload: cu, timeStampInvalid: tsi ? tsi : state.timeStampInvalid })

  return (
    <div id='upload-body'>
      <ProgressTracker currView={state.view} />

      <div className='mt-24' style={{ height: '67%' }}>
        {!state.file && <Redirect to='/upload' />}

        <Route 
          path='/upload'
          component={() => 
            <Upload
              file={state.file}
              updateState={uploadSetState}
            />
          }
        />
        <Route 
          path='/processer'
          component={() =>
            <Processer
              cols={state.cols}
              includedCols={state.includedCols}
              assignedCols={state.assignedCols}
              assignableCols={state.assignableCols}
              updateState={processSetState}
            />
          }
        />
        <Route 
          path='/validation'
          component={() =>
            <Validation
              file={state.file}
              includedCols={state.includedCols}
              assignedCols={state.assignedCols}
              updateState={validateSetState}
            />
          }
        />
      </div>

      <div>
        {!state.canUpload && state.view == 'validation' && Object.values(state.assignedCols).includes(null) &&
          <span 
            className='footer-item' 
            style={{ fontSize: '12px', color: 'red', position: 'absolute', bottom: 120 }}
          >
            One or more column assignments is missing.
          </span>
        }
        {!state.canUpload && state.view == 'validation' && state.timeStampInvalid &&
          <span 
            className='footer-item' 
            style={{ fontSize: '12px', color: 'red', position: 'absolute', bottom: 140}}
          >
            Please assign another column to Timestamp. The current one is missing or invalid.
          </span>
        }
      </div>

      <Footer style={state.view === 'upload' ? { justifyContent: 'flex-end' } : null}>
        {state.view === 'upload' &&
          <Link to='processer'>
            <button 
              className='next-btn' 
              onClick={() => setState({...state, view: 'processer'})} 
              disabled={state.file ? false : true} 
              style={{ float: 'right' }}
            >
              Next
            </button>
          </Link>
        }
        {state.view === 'processer' &&
          <>
            <Link to='upload'>
              <button 
                className='back-btn' 
                onClick={() => setState({...state, view: 'upload'})}
              >
                Back
              </button>
            </Link>
            <Link to='validation'>
              <button 
                className='next-btn' 
                onClick={() => setState({...state, view: 'validation'})} 
                style={{ float: 'right' }}
              >
                Next
              </button>
            </Link>
          </>
        }
        {state.view === 'validation' &&
          <>
            <Link to='processer'>
              <button 
                className='back-btn' 
                onClick={() => setState({...state, view: 'processer'})}>
                Back
              </button>
            </Link>
            <Link to='upload'>
              <button 
                className='next-btn' 
                onClick={handleUpload} 
                disabled={!state.canUpload} 
                style={{ float: 'right' }}
              >
                Upload
              </button>
            </Link>
          </>
        }
      </Footer>
    </div>
  )
}