import { useEffect } from 'react'
import { getUserInfo } from 'utils/auth/actions'
import { useDispatch, useSelector } from 'react-redux'
import websocketConnection, { closeWebsocketConnection } from 'utils/common/websocketConnection'


const PrivateRouteWrapper = (props) => {
  const { children } = props
  const dispatch = useDispatch()
  const authToken = useSelector(state => state.auth.authToken)

  useEffect(() => {
    if (authToken) {
      dispatch(websocketConnection(authToken))
      dispatch(getUserInfo())
    }
    return () => {
      closeWebsocketConnection()
    }
  }, [authToken]) // eslint-disable-line react-hooks/exhaustive-deps

  if (children) {
    return (
      children
    )
  } else {
    return null
  }
}

export default PrivateRouteWrapper
