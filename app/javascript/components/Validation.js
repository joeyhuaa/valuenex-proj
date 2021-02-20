import React, {useEffect} from 'react'
const papa = require('papaparse')

export default function Validation({
    file,
    includedCols,  
    assignedCols,
    setCanUpload,
}) {
    useEffect(() => {
        papa.parse(file, {
            complete: results => validate(results)
        })
    })

    let validate = results => {
        let timestamp = assignedCols.Timestamp
        let ts_index = results.data[0].indexOf(timestamp)
        let d_raw = results.data[1][ts_index]
        let d = new Date(d_raw)
        if (isNaN(d.getTime()) || !d_raw.includes('/')) setCanUpload(false)
        else setCanUpload(true)
    }

    return (
        <div>
            <h3>Included columns:</h3>
            {includedCols.map(col => <p key={col}>{col}</p>)}
            <h3>ID, Name, and Timestamp assignment:</h3>
            {Object.keys(assignedCols).map(key => {
                return (
                    <p key={key}>{key}: {assignedCols[key]}</p>
                )
            })}
        </div>
    )
}