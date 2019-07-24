import { combineReducers } from 'redux'
import user from './user/reducers'
import product from './product/reducers'

const rootReducer = combineReducers({
  user,
  product
})

export default rootReducer
