import React, { useEffect } from 'react'
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
			<p>Included columns:</p>
			{includedCols.map(col => <p key={col} style={{ fontWeight: 'bold', marginLeft: '35px' }}>{col}</p>)}
			<p style={{ marginTop: '30px' }}>ID, Name, and Timestamp assignment:</p>
			{Object.keys(assignedCols).map(key => {
				return (
					<p key={key} style={{ marginLeft: '35px', width: '250px' }}>{key}:
						<span style={{ fontWeight: 'bold', float: 'right' }}>{assignedCols[key]}</span>
					</p>
				)
			})}
		</div>
	)
}