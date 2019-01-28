import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './app/layout/App'
import { createStore } from 'redux'
import middleware from './middleware'
import reducer from './reducer'
import { Provider } from 'react-redux'

const store = createStore(reducer, middleware)

const Root = document.getElementById('root')

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App/>
    </Provider>
    , Root)
}

if (module.hot) {
  module.hot.accept('./app/layout/App', () => {
    setTimeout(render)
  })
}

store.firebaseAuthIsReady.then(() => {
  render()
})
