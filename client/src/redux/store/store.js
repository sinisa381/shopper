import { createStore, applyMiddleware } from 'redux'
import { persistStore } from 'redux-persist'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

import createRootReducer from './rootReducer'

const middlewares = [thunk]

export const store = createStore(
  createRootReducer(),
  applyMiddleware(...middlewares)
)

export const persistor = persistStore(store)
