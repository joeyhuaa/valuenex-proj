import React, { useEffect } from 'react'
const papa = require('papaparse')
import { Text } from '@types/joeys-components'

export default function Validation({
	file,
	includedCols = [],
	assignedCols = {},
	updateState
}) {
	useEffect(() => {
		if (file) {
			papa.parse(file, {
				complete: results => validate(results)
			})
		}
	}, [])

	let validate = results => {
		let timestamp = assignedCols.Timestamp
		let ts_index = results.data[0].indexOf(timestamp)
		let d_raw = results.data[1][ts_index]
		let d = new Date(d_raw)
		if (isNaN(d.getTime()) || !d_raw?.includes('/')) {
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