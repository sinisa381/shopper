import { LOGIN_USER, REGISTER_USER, LOGOUT_USER, AUTH_USER } from './types'
// const initState = {
//   userData: {
//     isAuth: false
//   }
// }
const initState = {}
export default function(state = initState, action) {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, loginSuccess: action.payload }
    case REGISTER_USER:
      return { ...state, success: action.payload }
    case LOGOUT_USER:
      return { ...state, userData: {} }
    case AUTH_USER:
      return {
        ...state,
        userData: action.payload
      }
    default:
      return state
  }
}
