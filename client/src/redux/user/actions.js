import axios from 'axios'
import { LOGIN_USER, REGISTER_USER, LOGOUT_USER, AUTH_USER } from './types'
import { USER_SERVER } from '../../components/utils/misc'

export function userLogin(user) {
  return {
    type: LOGIN_USER,
    payload: user
  }
}

export function loginUser(dataToSubmit) {
  return dispatch => {
    return axios.post(`${USER_SERVER}/login`, dataToSubmit).then(res => {
      return dispatch(userLogin(res.data))
    })
  }
}

export function logoutUser() {
  return dispatch => {
    dispatch({
      type: LOGOUT_USER
    })
  }
}

export function logout() {
  return dispatch => {
    axios.get(`${USER_SERVER}/logout`).then(res => {
      dispatch(logoutUser())
    })
  }
}

export function registerUser(userdata) {
  return {
    type: REGISTER_USER,
    payload: userdata
  }
}

export function userRegister(dataToSubmit) {
  return dispatch => {
    axios.post(`${USER_SERVER}/register`, dataToSubmit).then(res => {
      dispatch(registerUser(res.data))
    })
  }
}

export function authUser(user) {
  return {
    type: AUTH_USER,
    payload: user
  }
}

export function auth() {
  return dispatch => {
    return axios.get(`${USER_SERVER}/auth`).then(res => {
      return dispatch(authUser(res.data))
    })
  }
}
