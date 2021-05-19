import axios from 'axios'
import {
  SET_TOKEN,
  RESET_TOKEN,
  SET_USER_INFO,
  GET_USER_INFO
} from './types'
import { checkErrorStatus, setSnackbar } from 'utils/common/actions'
import history from 'browserHistory'
import store from 'store'
import Config from 'config'

const { apiUrl } = Config.network


export const resetAuthToken = () => {
  return (dispatch) => {
    localStorage.setItem('authToken', null)
    dispatch({
      type: RESET_TOKEN
    })
    delete axios.defaults.headers.common.Authorization
    if (history.location.pathname !== '/login') {
      history.push('/login')
    }
  }
}

export const storeAuthToken = (authToken, rememberAuthToken) => {
  return (dispatch) => {
    if (rememberAuthToken) {
      localStorage.setItem('authToken', authToken)
    }
    dispatch({
      type: SET_TOKEN,
      payload: {
        authToken
      }
    })
    if (authToken) {
      axios.defaults.headers.common.Authorization = 'Token '.concat(authToken)
    } else {
      delete axios.defaults.headers.common.Authorization
    }
  }
}

export const getUserInfo = () => {
  const { authToken } = store.getState().auth
  return (dispatch) => {
    if (!authToken) {
      dispatch(resetAuthToken())
    } else {
      axios.defaults.headers.common.Authorization = 'Token '.concat(authToken)
    }
    dispatch({
      type: GET_USER_INFO,
      payload: {
        userInfoIsLoading: true
      }
    })
    let url = `${apiUrl}users/me/`
    axios.get(url).then((body) => {
      const { data } = body
      dispatch({
        type: SET_USER_INFO,
        payload: {
          name: data.name,
          userType: data.user_type,
          email: data.email
        }
      })
      localStorage.setItem('userType', data.user_type)
      dispatch({
        type: GET_USER_INFO,
        payload: {
          userInfoIsLoading: false
        }
      })
    }).catch(error => {
      if (error.response) {
        dispatch(checkErrorStatus(error.response.status))
        dispatch(setSnackbar(error.response.data.detail, 'error'))
        console.log(error.response.data.detail)
      } else {
        dispatch(setSnackbar('Connection error', 'error'))
        console.log('Connection error')
      }
    })
  }
}
