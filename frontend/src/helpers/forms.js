export const formReducer = (state, action) => {
  switch (action.type) {
    case 'error':
      return {
        errors: action.payload
      }
    case 'reset':
      return {
        errors: null
      }
    default:
      throw new Error()
  }
}

export const getFieldError = (state, field) => {
  if (state && state.errors && state.errors[field] && state.errors[field][0] && !state.errors[field][0].non_field_errors) {
    return state.errors[field][0]
  } else if (state && state.errors && state.errors[field] && state.errors[field][0] && state.errors[field][0].non_field_errors) {
    return state.errors[field][0].non_field_errors[0]
  }
  return null
}
