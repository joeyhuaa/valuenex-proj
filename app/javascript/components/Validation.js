import React from 'react'

export default function Validation({
    includedCols,  
    assignedCols
}) {
    // console.log(includedCols, assignedCols)
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