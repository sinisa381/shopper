import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import userReducer from '../user/reducers'
import productReducer from '../product/reducers'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['product']
}

export default () =>
  persistReducer(
    persistConfig,
    combineReducers({
      user: userReducer,
      product: productReducer
    })
  )
