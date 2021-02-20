import React, {useEffect, useState} from 'react'
import Upload from './Upload'
import Processer from './Processer'
import Validation from './Validation'
import Progress from './Progress'
const papa = require('papaparse')

export default function App() {
    let [file, setFile] = useState()
    let [cols, setCols] = useState()
    let [view, setView] = useState('upload')
    let [includedCols, setIncludedCols] = useState()
    let [assignedCols, setAssignedCols] = useState()
    let [canUpload, setCanUpload] = useState(false)

    /*
    [
        {
            colname: id
            included: true
            assigned: "ID"
        },
        {
            colname: total_funding_usd
            included: false
            assigned: null
        }
    ]
    */

    // useEffect(() => {
    //     console.log(includedCols, assignedCols)
    // }, [includedCols, assignedCols])

    let handleBack = () => {
        if (view === 'processer') setView('upload')
        if (view === 'validation') setView('processer')
    }

    let handleNext = () => {
        if (view === 'upload') setView('processer')
        if (view === 'processer') setView('validation')
    }

    let handleUpload = () => {

        let filterIncludedCols = data => {
            let obj = {}
            Object.keys(data).forEach(col => { if (includedCols.includes(col)) obj[col] = data[col] })
            return obj
        }

        let filterAssignedCols = data => {
            let obj = {}
            let pairs = Object.entries(assignedCols).flat()
            Object.keys(data).forEach(col => { 
                if (pairs.includes(col)) {
                    let i = pairs.findIndex(x => x === col) // find the index of col in pairs
                    let assigned_key = pairs[i-1] // the previous element will be the assigned key
                    obj[assigned_key] = data[col] 
                }
            })
            return obj
        }

        // parse, filter, store in includedData and assignedData
        let includedData = [], assignedData = [] // arr of objs
        papa.parse(file, {
            header: true,
            step: (row, parser) => {
                // filter the data and push it to wantedResults
                includedData.push( filterIncludedCols(row.data) )
                assignedData.push( filterAssignedCols(row.data) )
            },
            complete: () => post(includedData, assignedData)
        })

        // post 
        let post = (includedData, assignedData) => {
            let formData = new FormData()
            formData.append('file', file)
            formData.append('included_data', JSON.stringify(includedData))
            formData.append('assigned_data', JSON.stringify(assignedData))
            fetch('/data', {
                method: 'POST',
                body: formData
            }).then(response => response.json())
        }

        // reset state
        setFile()
        setCols()
        setView('upload')
        setIncludedCols()
        setAssignedCols()
    }

    return (
        <div style={{width:'718px', height:'700px'}}>
            <Progress 
                currView={view}
            />
            {view === 'upload' &&
                <Upload
                    retrieveFile={setFile}
                    retrieveCols={setCols}
                />
            }
            {view === 'processer' &&
                <Processer 
                    cols={cols}
                    retrieveIncludedCols={setIncludedCols}
                    retrieveAssignedCols={setAssignedCols}
                />
            }
            {view === 'validation' &&
                <Validation
                    file={file}
                    includedCols={includedCols}
                    assignedCols={assignedCols} 
                    setCanUpload={setCanUpload}
                />
            }
            <div style={{display:'flex'}}>
                {view !== 'upload' && 
                    <button onClick={handleBack}>
                        Back
                    </button>
                }
                {view !== 'validation' &&
                    <button onClick={handleNext} disabled={file ? false : true}>
                        Next
                    </button>
                }
                {view == 'validation' &&
                    <div>
                        <button onClick={handleUpload} disabled={!canUpload}>
                            Upload
                        </button>
                        {!canUpload && 
                            <span style={{fontSize:'10px', color:'red', marginLeft:'10px'}}>
                                Please pick another column for Timestamp. The current one is invalid.
                            </span>
                        }
                    </div>
                }
            </div>
        </div>
    )
}