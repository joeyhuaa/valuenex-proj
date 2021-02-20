import React, {useEffect, useState} from 'react'
import Upload from './Upload'
import Processer from './Processer'
import Validation from './Validation'
import Progress from './Progress'

export default function App() {
    let [file, setFile] = useState()
    let [cols, setCols] = useState()
    let [view, setView] = useState('upload')
    let [includedCols, setIncludedCols] = useState()
    let [assignedCols, setAssignedCols] = useState()

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
        // post 
        let formData = new FormData()
        formData.append('file', file)
        formData.append('included_cols', includedCols)
        formData.append('assigned_cols', JSON.stringify(assignedCols))
        fetch('/data', {
            method: 'POST',
            body: formData
        }).then(response => response.json())

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
                    includedCols={includedCols}
                    assignedCols={assignedCols} 
                />
            }
            <div style={{display:'flex'}}>
                {view !== 'upload' && 
                    <button onClick={handleBack}>
                        Back
                    </button>
                }
                {view !== 'validation' &&
                    <button onClick={handleNext} style={{float:'right'}} disabled={file ? false : true}>
                        Next
                    </button>
                }
                {view == 'validation' &&
                    <button onClick={handleUpload}>
                        Upload
                    </button>
                }
            </div>
        </div>
    )
}