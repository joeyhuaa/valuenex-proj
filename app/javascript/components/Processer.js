import React, {useState, useEffect} from  'react'
import Select from 'react-select'

export default function Processer({
    cols,
    retrieveIncludedCols,
    retrieveAssignedCols
}) {
    let [checkedCols, setCheckedCols] = useState(cols) 
    let [availableCols, setAvailableCols] = useState(cols)
    let [assignedCols, setAssignedCols] = useState({
        'ID': null, 'Name': null, 'Timestamp': null 
    })

    useEffect(() => {
        retrieveIncludedCols(checkedCols)
        retrieveAssignedCols(assignedCols)
    }, [assignedCols, checkedCols])

    let handleColCheck = colname => {
        let checkedColsCopy =  [...checkedCols]
        if (checkedCols.includes(colname)) {
            let i = checkedCols.indexOf(colname)
            // checkedColsCopy.splice(i, 1, null)
            checkedColsCopy.splice(i, 1)
        } else {
            // let i = checkedCols.indexOf(null)
            // checkedColsCopy.splice(i, 1, colname)
            checkedColsCopy.push(colname)
        }
        setCheckedCols(checkedColsCopy)
        setAvailableCols(checkedColsCopy)
    }

    let handleColSelect = (colname, label) => {
        let assignedColsCopy = {...assignedCols}
        let availableColsCopy = [...availableCols]

        assignedColsCopy[label] = colname
        availableColsCopy.splice(availableColsCopy.indexOf(colname), 1)

        setAssignedCols(assignedColsCopy)
        setAvailableCols(availableColsCopy)
    }

    return (
        <div>
            <div>
                <h3>Exclude columns by untoggling the checkbox.</h3>
                <div style={{display:'flex', flexDirection:'column'}}>
                    {cols.map(col => {
                        return (
                            <div key={col}>
                                <input 
                                    type='checkbox'
                                    checked={checkedCols.includes(col)}
                                    onChange={() => handleColCheck(col)}
                                />
                                <label>{col}</label>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div>
                <h3>Choose included columns to uniquely assign to ID, Name, Timestamp.</h3>
                {['ID', 'Name', 'Timestamp'].map(label => {
                    return (
                        <div key={label}>
                            <h4>{label}</h4>
                            <Select 
                                options={availableCols.map(col => {
                                    return {value: col, label: col}
                                })}
                                onChange={val => handleColSelect(val.value, label)}
                                isSearchable
                            />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}