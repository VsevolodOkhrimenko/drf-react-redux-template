import React from 'react'
import Routes from 'routes'
import { useSelector } from 'react-redux'

const App = () => {
  const authToken = useSelector(state => state.auth.authToken)
  const userType = useSelector(state => state.auth.userType)

  return (
    <div className='app-wrapper'>
      <Routes authToken={authToken} userType={userType} />
    </div>
  )
}


export default App
