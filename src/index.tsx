import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './app/layout/App';
import './index.css';
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#6b9aaf',
    },
    secondary: {
      main: '#e6f8fb',
    },
  },
})

const root = document.getElementById('root') as HTMLElement

const render = () => ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <App />
  </MuiThemeProvider>
  , root)

if ((module as any).hot) {
  (module as any).hot.accept('./app/layout/App', () => {
    setTimeout(render)
  })
}

render()