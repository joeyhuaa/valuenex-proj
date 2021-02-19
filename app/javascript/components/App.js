import React, {useEffect, useState} from 'react'
import Upload from './Upload'
import Processer from './Processer'
import Validation from './Validation'
import Progress from './Progress'

let views = ['upload', 'processer', 'validation']

export default function App() {
    let [data, setData] = useState()
    let [view, setView] = useState('upload')
    let [includedCols, setIncludedCols] = useState()
    let [assignedCols, setAssignedCols] = useState()

    useEffect(() => {
        console.log(includedCols, assignedCols)
    }, [includedCols, assignedCols])

    let handleBack = () => {
        if (view === 'processer') setView('upload')
        if (view === 'validation') setView('processer')
    }

    let handleNext = () => {
        if (view === 'upload') setView('processer')
        if (view === 'processer') setView('validation')
    }

    return (
        <div style={{width:'718px', height:'700px'}}>
            <Progress 
                currView={view}
                pastViews={views.slice(0, views.indexOf(view))}
            />
            {view === 'upload' &&
                <Upload
                    retrieveData={setData}
                />
            }
            {view === 'processer' &&
                <Processer 
                    data={data}
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
                    <button onClick={handleNext}>
                        Next
                    </button>
                }
                {view == 'validation' &&
                    <button>
                        Upload another
                    </button>
                }
            </div>
        </div>
    )
}