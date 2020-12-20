import React from 'react'
import ReactDOM from 'react-dom'
import 'semantic-ui-css/semantic.min.css'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './app/layout/App'

function render() {
  ReactDOM.render(
    <Router>
      <App/>
    </Router>,
    document.getElementById('root'),
  )
}

if (module.hot) {
  module.hot.accept('./app/layout/App', function () {
    setTimeout(render)
  })
}

render()