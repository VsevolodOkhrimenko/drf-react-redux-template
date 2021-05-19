import {
  SET_TOKEN,
  RESET_TOKEN,
  SET_USER_INFO,
  GET_USER_INFO,
  GET_USER_INFO_ERROR
} from './types'

const initialState = {
  authToken: localStorage.getItem('authToken'),
  name: null,
  email: null,
  userType: localStorage.getItem('userType'),
  userInfoIsLoading: false,
  getUserInfoError: null
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return {
        ...state,
        authToken: action.payload.authToken
      }
    case GET_USER_INFO:
      return {
        ...state,
        userInfoIsLoading: action.payload.userInfoIsLoading,
        getUserInfoError: null
      }
    case SET_USER_INFO:
      return {
        ...state,
        getUserInfoError: null,
        name: action.payload.name,
        userType: action.payload.userType,
        email: action.payload.email
      }
    case GET_USER_INFO_ERROR:
      return {
        ...state,
        userInfoIsLoading: false,
        getUserInfoError: action.payload.getUserInfoError
      }
    case RESET_TOKEN:
      return initialState
    default:
      return state
  }
}

export default authReducer
