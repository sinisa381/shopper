import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Routes from './routes'
import { ThemeProvider } from 'styled-components'
import theme from './globals/theme'
import { BrowserRouter } from 'react-router-dom'
import 'typeface-eb-garamond'
import 'typeface-titillium-web'
import 'typeface-forum'
import 'typeface-roboto'

import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import { store, persistor } from './redux/store/store'

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <PersistGate persistor={persistor}>
          <Routes />
        </PersistGate>
      </ThemeProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)
