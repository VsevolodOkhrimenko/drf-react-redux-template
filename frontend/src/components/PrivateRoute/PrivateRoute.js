import React from 'react'
import {
  Route,
  Redirect
} from 'react-router-dom'
import PrivateRouteWrapper from 'components/PrivateRouteWrapper'



const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      rest.authToken ?
        <PrivateRouteWrapper>
          <Component {...props} />
        </PrivateRouteWrapper>
        : <Redirect to='/login' />
    )}
  />
)

export default PrivateRoute
