import React from 'react'
import ReactDOM from 'react-dom'
import 'semantic-ui-css/semantic.min.css'
import './index.css'
import App from './App'
import {BrowserRouter as Router} from 'react-router-dom'
import {Provider} from 'react-redux'
import {configureStore} from './redux'


const store = configureStore()

function render() {
    ReactDOM.render(
        <Provider store={store}>
            <Router>
                <App/>
            </Router>
        </Provider>,
        document.getElementById('root')
    )
}


if (module.hot) {
    module.hot.accept('./App', function () {
        setTimeout(render)
    })
}

render()