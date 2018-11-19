import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './app/layout/App';
import './index.css';

const root = document.getElementById('root') as HTMLElement

const render = () => ReactDOM.render(<App />, root)

if ((module as any).hot) {
  (module as any).hot.accept('./app/layout/App', () => {
    setTimeout(render)
  })
}

render()