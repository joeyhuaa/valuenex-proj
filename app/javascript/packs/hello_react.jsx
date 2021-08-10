// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'
import App from '../components/App'
import 'react-hot-loader'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>,
    document.body.appendChild(document.createElement('div')),
  )
})

if (module.hot) {
  module.hot.accept('../components/App.js', () => {
    render(require('../components/App.js').default);
  });
}
