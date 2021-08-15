import React, { useState, useEffect } from 'react'
import { hot } from 'react-hot-loader/root'
import { Route, Link, Redirect, useLocation } from 'react-router-dom'

import Sidebar from './Sidebar'
import UploadBody from './UploadBody'
import DataView from './DataView'

function App() {
	const { pathname } = useLocation()

	return (
		<div style={{ display: 'flex', width: '100%' }}>
			<Sidebar />

			<Route 
				path={'/data/:id'}
				component={DataView}
			/>

			{!pathname.includes('data') && <UploadBody />}
		</div>
	)
}

export default hot(App)