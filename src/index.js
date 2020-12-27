import React from 'react'
import ReactDOM from 'react-dom'
import 'semantic-ui-css/semantic.min.css'
import './index.css'
import { ConnectedRouter } from 'connected-react-router'
import { Provider } from 'react-redux'
import { configureStore, history } from './app/store/configureStore'
import App from './app/layout/App'
import ScrollToTop from './app/layout/ScrollToTop'

const store = configureStore()

function render() {
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <ScrollToTop />
        <App/>
      </ConnectedRouter>
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