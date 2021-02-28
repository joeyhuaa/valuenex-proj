import React, {useEffect} from 'react'
const papa = require('papaparse')

export default function Validation({
    file,
    includedCols,  
    assignedCols,
    updateState
}) {
    useEffect(() => {
        papa.parse(file, {
            complete: results => validate(results)
        })
    }, [])

    let validate = results => {
        let timestamp = assignedCols.Timestamp
        let ts_index = results.data[0].indexOf(timestamp)
        let d_raw = results.data[1][ts_index]
        let d = new Date(d_raw)
        if (isNaN(d.getTime()) || !d_raw.includes('/')) {
            updateState(false, true) // canUpload, timeStampInvalid
        }
        else {
            if (!Object.values(assignedCols).includes(null)) {
                updateState(true, null)
            } else {
                updateState(false, false)
            }
        }
    }

    return (
        <div>
            <h3>Included columns:</h3>
            {includedCols.map(col => <p key={col} style={{color: '#6d32a8'}}>{col}</p>)}
            <h3>ID, Name, and Timestamp assignment:</h3>
            {Object.keys(assignedCols).map(key => {
                return (
                    <p key={key}>{key}: <span style={{color: '#008eff'}}>{assignedCols[key]}</span></p>
                )
            })}
        </div>
    )
}