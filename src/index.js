import React from 'react'
import ReactDOM from 'react-dom'
import 'semantic-ui-css/semantic.min.css'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './app/layout/App'
import { Provider } from 'react-redux'
import { configureStore } from './app/store/configureStore'

const store = configureStore()

console.log(store.getState())
function render() {
  ReactDOM.render(
    <Provider store={store}>
      <Router>
        <App/>
      </Router>
    </Provider>,
    document.getElementById('root'),
  )
}

if (module.hot) {
  module.hot.accept('./app/layout/App', function () {
    setTimeout(render)
  })
}

render()