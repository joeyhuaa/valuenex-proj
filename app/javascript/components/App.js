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
        let wantedResults = [] // arr of objs
        let filterCols = data => {
            let obj = {}
            Object.keys(data).forEach(col => { if (includedCols.includes(col)) obj[col] = data[col] })
            return obj
        }
    
        // parse
        papa.parse(file, {
            header: true,
            step: (row, parser) => {
                // filter the data and push it to wantedResults
                
                // post 
                let formData = new FormData()
                formData.append('stream', JSON.stringify(filterCols(row.data)))
                fetch('/data_stream', {
                    method: 'POST',
                    body: formData
                }).then(response => response.json())
            }
        })

        // post 
        // let formData = new FormData()
        // formData.append('file', file)
        // formData.append('included_cols', includedCols)
        // formData.append('assigned_cols', JSON.stringify(assignedCols))
        // fetch('/data', {
        //     method: 'POST',
        //     body: formData
        // }).then(response => response.json())

        // // reset state
        // setFile()
        // setCols()
        // setView('upload')
        // setIncludedCols()
        // setAssignedCols()
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