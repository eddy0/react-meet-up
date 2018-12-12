import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './app/layout/App'

const Root = document.getElementById('root')

const render = () => {
  ReactDOM.render(<App/>, Root)
}

if (module.hot) {
  module.hot.accept('./App', () => {
    render()
  })
}

render()
