import React from 'react'
import Select from 'react-select'
import { Text } from '@types/joeys-components'

let selectStyles = {
  menu: provided => ({
    ...provided,
    position: 'absolute',
  }),
  container: provided => ({
    ...provided,
    width: 250
  }),
  option: provided => ({
    ...provided,
    color: 'black'
  })
}

export default function Processer(props) {
  const {
    cols,
    includedCols,
    assignedCols,
    assignableCols,
    updateState
  } = props
  
  let handleColCheck = colname => {
    let includedColsCopy = [...includedCols]
    let assignedColsCopy = { ...assignedCols }
    if (includedCols.includes(colname)) {
      // remove from includedCols
      let i = includedCols.indexOf(colname)
      includedColsCopy.splice(i, 1)

      // check if it's also in assignedCols, if so remove
      Object.keys(assignedCols).forEach(key => {
        if (assignedCols[key] === colname) assignedColsCopy[key] = null
      })
    } else {
      includedColsCopy.push(colname)
    }

    // assignable = included - assigned
    let assignableColsCopy = includedColsCopy.filter(c => !Object.values(assignedCols).includes(c))
    updateState(includedColsCopy, assignedColsCopy, assignableColsCopy)
  }

  let handleColSelect = (colname, label) => {
    let assignedColsCopy = { ...assignedCols }
    let assignableColsCopy = [...assignableCols]

    // if we are clearing selection
    if (colname === '') {
      assignableColsCopy.push(assignedColsCopy[label])
      assignedColsCopy[label] = null

      // if making new selection
    } else {
      if (assignedColsCopy[label]) {
        assignableColsCopy.splice(assignableColsCopy.indexOf(colname), 1, assignedColsCopy[label])
        assignedColsCopy[label] = colname
      } else {
        assignedColsCopy[label] = colname
        assignableColsCopy.splice(assignableColsCopy.indexOf(colname), 1)
      }
    }

    updateState(includedCols, assignedColsCopy, assignableColsCopy)
  }

  if (cols.length === 0) {
    return (
      <Text>No file chosen</Text>
    )
  }

  return (
    <div>
      <div>
        <p>Exclude columns by untoggling the checkbox.</p>
        <div className='df fdc'>
          {cols.map(col => {
            return (
              <div className='mt-4' key={col}>
                <input
                  type='checkbox'
                  checked={includedCols.includes(col)}
                  onChange={() => handleColCheck(col)}
                />
                <label>{col}</label>
              </div>
            )
          })}
        </div>
      </div>
      <div style={{ marginTop: '30px' }}>
        <p>Choose included columns to uniquely assign to <b>ID</b>, <b>Name</b>, <b>Timestamp</b>.</p>
        {['ID', 'Name', 'Timestamp'].map(label => {
          return (
            <div key={label}>
              <Text className='mt-16 mb-4' style={{ fontWeight: 'bold' }}>{label}</Text>
              <Select
                options={assignableCols.map(col => ({ value: col, label: col }) )}
                onChange={val => handleColSelect(val ? val.value : '', label)}
                value={{ value: label, label: assignedCols[label] ? assignedCols[label] : "Select..." }}
                isSearchable
                isClearable
                styles={selectStyles}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}