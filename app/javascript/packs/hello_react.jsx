// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'
import App from '../components/App'

document.addEventListener('DOMContentLoaded', () => {
  let div = document.getElementById('data')
  let data = JSON.parse(div.getAttribute('data'))
  ReactDOM.render(
    <App data={data} />,
    document.body.appendChild(document.createElement('div')),
  )
})
