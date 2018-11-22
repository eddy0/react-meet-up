import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './App'
import './index.css'

const root: HTMLElement = document.getElementById('root') as HTMLElement

const render = (): void => {
  ReactDOM.render(<App />, root as HTMLElement)
}

if ((module as any).hot) {
  (module as any).hot.accept('./App', () => {
    render()
  })
}
render()
