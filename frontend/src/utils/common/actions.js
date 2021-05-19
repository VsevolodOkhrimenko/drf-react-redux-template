import {
  EXAMPLE_TYPE,
  SET_SNACKBAR,
  CLOSE_SNACKBAR
} from './types'
import { resetAuthToken } from 'utils/auth/actions'


export const exampleAction = (exampleState) => {
  return (dispatch) => {
    dispatch({
      type: EXAMPLE_TYPE,
      payload: {
        exampleState: exampleState
      }
    })
  }
}

export const setSnackbar = (message, type = 'success') => {
  return (dispatch) => {
    dispatch({
      type: SET_SNACKBAR,
      payload: {
        message: message,
        type: type
      }
    })
  }
}

export const checkErrorStatus = (code) => {
  return (dispatch) => {
    if (code === 401) {
      dispatch(setSnackbar('Auth token is expired', 'error'))
      dispatch(resetAuthToken())
    }
  }
}

export const closeSnackbar = () => {
  return (dispatch) => {
    dispatch({
      type: CLOSE_SNACKBAR
    })
  }
}
