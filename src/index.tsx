import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import { Provider } from 'react-redux'
import store from './store'

const root: HTMLElement = document.getElementById('root') as HTMLElement

const Root = (
  <Provider store={store}>
    <App />
  </Provider>
)

const render = (): void => {
  ReactDOM.render(Root, root)
}

// if ((module as any)) {

//   // (module as any).hot.accept('./reducer/index', () => {
//   //   const newReducer = require('./reducer').default
//   //   console.log('newReducer', newReducer)
//   //   store.replaceReducer(newReducer)
//   // })

//   (module as any).hot.accept('./App', () => {
//     console.log('hot load')
//     console.log(module);
//     setTimeout(render)
//   })

 
// }

render()
