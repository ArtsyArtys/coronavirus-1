import '@babel/polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import store from '../client/store'
import {Router} from 'react-router-dom'
import history from '../client/history'
import App from '../client/App'
import * as serviceWorker from './service-worker'

export default ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('app')
)

serviceWorker.register()
