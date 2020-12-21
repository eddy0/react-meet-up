import React from 'react'
import ReactDOM from 'react-dom'
import 'semantic-ui-css/semantic.min.css'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { configureStore } from './app/store/configureStore'
import App from './app/layout/App'
import ScrollToTop from './app/layout/ScrollToTop'
import { loadEvents } from './feature/events/eventActions'

const store = configureStore()

store.dispatch(loadEvents())

function render() {
  ReactDOM.render(
    <Provider store={store}>
      <Router>
        <ScrollToTop />
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