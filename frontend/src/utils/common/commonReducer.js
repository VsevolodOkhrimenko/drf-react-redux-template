import {
  EXAMPLE_TYPE,
  SET_SNACKBAR,
  CLOSE_SNACKBAR
} from './types'

const initialState = {
  exampleState: false,
  snackbarMessage: null,
  snackbarType: 'success'
}

const commonReducer = (state = initialState, action) => {
  switch (action.type) {
    case EXAMPLE_TYPE:
      return {
        ...state,
        exampleState: action.payload.exampleState
      }
    case SET_SNACKBAR:
      return {
        ...state,
        snackbarMessage: action.payload.message,
        snackbarType: action.payload.type
      }
    case CLOSE_SNACKBAR:
      return {
        ...state,
        snackbarMessage: null
      }
    default:
      return state
  }
}

export default commonReducer
