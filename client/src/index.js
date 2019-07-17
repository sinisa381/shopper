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

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import promiseMiddleware from 'redux-promise'
import ReduxThunk from 'redux-thunk'
import Reducer from './reducers'

const createStoreWithMiddleware = applyMiddleware(
	promiseMiddleware,
	ReduxThunk
)(createStore)

ReactDOM.render(
	<Provider
		store={createStoreWithMiddleware(
			Reducer,
			window.__REDUX_DEVTOOLS_EXTENSION__ &&
				window.__REDUX_DEVTOOLS_EXTENSION__()
		)}
	>
		<BrowserRouter>
			<ThemeProvider theme={theme}>
				<Routes />
			</ThemeProvider>
		</BrowserRouter>
	</Provider>,
	document.getElementById('root')
)
