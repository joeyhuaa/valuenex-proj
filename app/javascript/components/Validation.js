import React, { useState, useEffect } from 'react'
import { Text } from '@types/joeys-components'
const papa = require('papaparse')

export default function Validation({
	file,
	includedCols = [],
	assignedCols = {},
	updateState
}) {
	let [parseResults, setParseResults] = useState(null)

	useEffect(() => {
		if (file) {
			papa.parse(file, {
				preview: 5,
				complete: results => setParseResults(results)
			})
		}
	}, [])

	useEffect(() => {
		let validate = () => {
			let timestamp = assignedCols.Timestamp
			let ts_index = parseResults.data[0].indexOf(timestamp)
			let d_raw = parseResults.data[1][ts_index]
			let d = new Date(d_raw)
			if ( isNaN(d.getTime()) ) {
				updateState(false, true) // canUpload, timeStampInvalid
			}
			else {
				if (!Object.values(assignedCols)?.includes(null)) {
					updateState(true, null)
				} else {
					updateState(false, false)
				}
			}
		}

		if (parseResults) {
			validate()
		}
	}, [parseResults])

	if (!file) {
    return (
      <Text>No file chosen</Text>
    )
  }

	return (
		<div>
			<Text>Included columns:</Text>
			{includedCols.map(col => (
				<Text className='mt-8' key={col} style={{ fontWeight: 'bold', marginLeft: '35px' }}>
					{col}
				</Text>
			))}

			<Text className='mt-24'>ID, Name, and Timestamp assignment:</Text>
			{Object.keys(assignedCols).map(key => {
				return (
					<Text className='mt-8' key={key} style={{ marginLeft: '35px', width: '250px' }}>
						{key}:
						<Text style={{ fontWeight: 'bold', float: 'right' }}>
							{assignedCols[key]}
						</Text>
					</Text>
				)
			})}
		</div>
	)
}