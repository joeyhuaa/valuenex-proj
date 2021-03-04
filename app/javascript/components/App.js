import React, {useState, useEffect} from 'react'
import Upload from './Upload'
import Processer from './Processer'
import Validation from './Validation'
import Progress from './Progress'
const papa = require('papaparse')

export default function App({data}) {
    let [state, setState] = useState({
        file: null,
        cols: [],
        view: 'upload',
        includedCols: [],
        assignedCols: {'ID': null, 'Name': null, 'Timestamp': null},
        assignableCols: [],
        canUpload: false,
        timeStampInvalid: true
    })

    useEffect(() => {   
        setState({
            ...state,
            assignedCols: {'ID': null, 'Name': null, 'Timestamp': null}
        })
    }, [state.file])

    let handleBack = () => {
        if (state.view === 'processer') setState({...state, view: 'upload'})
        else if (state.view === 'validation') setState({...state, view: 'processer'})
    }

    let handleNext = () => {
        if (state.view === 'upload') setState({...state, view: 'processer'})
        else if (state.view === 'processer') setState({...state, view: 'validation'})
    }

    let handleUpload = () => {

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
                    let assigned_key = pairs[i-1] // the previous element will be the assigned key
                    obj[assigned_key] = [col, data[col]]
                }
            })
            return obj
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

        // post 
        let post = (includedData, assignedData) => {
            let formData = new FormData()
            formData.append('file', state.file)
            formData.append('included_data', JSON.stringify(includedData))
            formData.append('assigned_data', JSON.stringify(assignedData))
            fetch('/data', {
                method: 'POST',
                body: formData
            }).then(() => {
                alert('Upload Success!')
                window.location.reload()
            })
        }

        // reset state
        setState({
            file: null,
            view: 'upload',
            cols: [],
            includedCols: [],
            assignedCols: {'ID': null, 'Name': null, 'Timestamp': null},
            assignableCols: [],
            canUpload: false,
            timeStampInvalid: true
        })
    }

    let uploadSetState = (file, cols) => setState({...state, file: file, cols: cols, includedCols: cols, assignableCols: cols})

    let processSetState = (ic, ac, ac2) => setState({...state, includedCols: ic, assignedCols: ac, assignableCols: ac2})

    let validateSetState = (cu, tsi) => setState({...state, canUpload: cu, timeStampInvalid: tsi ? tsi : state.timeStampInvalid})

    return (
        <div style={{display:'flex', width:'100%'}}>
            <div style={{
                borderRight:'solid #dadada 2px', 
                width:'200px', 
                whiteSpace:'pre-wrap',
                overflowY:'scroll',
                height:'100vh',
                paddingRight:'10px',
                paddingTop:'20px'
            }}>
                <h3>Your Uploads</h3>
                {data.map(d => {
                    let included_cols = Object.keys(d.included_data[0])
                    let assigned_cols = Object.entries(d.assigned_data[0])
                    return (
                        <div 
                            id='uploads-sidebar'
                            style={{
                                borderBottom:'solid #dadada 1px',
                                paddingTop:'15px',
                                paddingBottom:'10px',
                                lineHeight:'5px'
                            }}
                        >
                            <span style={{color:'#008eff'}}>#{d.id}</span>
                            <h5>Filename:</h5>
                            <span>{d.filename}</span>
                            <h5>Included Columns:</h5>
                            {included_cols.map(i => <span style={{marginTop:'12px'}}>{i}</span>)}
                            <h5>Assigned Columns:</h5>
                            {assigned_cols.map(a => <p style={{width:'170px'}}>{a[0]}: <span style={{float:'right'}}>{a[1][0]}</span></p>)}
                        </div>
                    )
                })}
            </div>

            <div style={{width:'718px', height:'700px', marginLeft:'70px'}}>
                <Progress 
                    currView={state.view}
                />
                <div style={{height:'65%'}}>
                    {state.view === 'upload' &&
                        <Upload
                            file={state.file}
                            updateState={uploadSetState}
                        />
                    }
                    {state.view === 'processer' &&
                        <Processer 
                            cols={state.cols}
                            includedCols={state.includedCols}
                            assignedCols={state.assignedCols}
                            assignableCols={state.assignableCols}
                            updateState={processSetState}
                        />
                    }
                    {state.view === 'validation' &&
                        <Validation
                            file={state.file}
                            includedCols={state.includedCols}
                            assignedCols={state.assignedCols} 
                            updateState={validateSetState}
                        />
                    }
                </div>
                
                <div>
                    {!state.canUpload && state.view == 'validation' && Object.values(state.assignedCols).includes(null) &&
                        <span className='footer-item' style={{fontSize:'10px', color:'red', position:'absolute', zIndex:10, top:595}}>
                            One or more column assignments is missing.
                        </span>
                    }
                    {!state.canUpload && state.view == 'validation' && state.timeStampInvalid &&
                        <span className='footer-item' style={{fontSize:'10px', color:'red', position:'absolute', zIndex:10, top:605}}>
                            Please assign another column to Timestamp. The current one is missing or invalid.
                        </span>
                    }
                </div>

                <div id='footer' style={state.view === 'upload' ? {justifyContent:'flex-end'} : null}>
                    {state.view === 'upload' &&
                        <button className='next-btn' onClick={handleNext} disabled={state.file ? false : true} style={{float:'right'}}>
                            Next
                        </button>
                    }
                    {state.view !== 'upload' && 
                        <button className='back-btn' onClick={handleBack}>
                            Back
                        </button>
                    }
                    {state.view !== 'validation' && state.view !== 'upload' &&
                        <button className='next-btn' onClick={handleNext} disabled={state.file ? false : true}>
                            Next
                        </button>
                    }
                    {state.view === 'validation' &&
                        <button className='upload-btn' onClick={handleUpload} disabled={!state.canUpload}>
                            Upload
                        </button>                        
                    }
                </div>
            </div>
        </div>
    )
}