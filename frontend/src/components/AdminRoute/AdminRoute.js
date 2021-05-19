import React from 'react'
import {
  Redirect
} from 'react-router-dom'
import { userIsAdmin } from 'helpers/common'
import PrivateRoute from 'components/PrivateRoute'


const AdminRoute = ({ ...rest }) => (
    userIsAdmin(rest.userType) ?
      <PrivateRoute {...rest} /> : <Redirect to='/' />
  )

export default AdminRoute
