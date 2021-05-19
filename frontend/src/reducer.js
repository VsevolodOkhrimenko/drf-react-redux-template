import { combineReducers } from 'redux'
import authReducer from 'utils/auth/authReducer'
import commonReducer from 'utils/common/commonReducer'


const reducer = combineReducers({
  auth: authReducer,
  common: commonReducer
})

export default reducer
