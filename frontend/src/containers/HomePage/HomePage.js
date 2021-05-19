import './HomePage.scss'
import React, { useEffect } from 'react'
import DocumentTitle from 'react-document-title'
import { useDispatch, useSelector } from 'react-redux'
import { exampleAction } from 'utils/common/actions'


const HomePage = () => {
  const dispatch = useDispatch()
  const exampleState = useSelector(state => state.common.exampleState)

  useEffect(() => {
    dispatch(exampleAction(true))
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const onExampleClick = () => {
    dispatch(exampleAction(!exampleState))
  }

  return (
    <>
      <DocumentTitle title='Home | Training App' />
      <div className='home-page'>
        <h1>Home Page</h1>
        <p>Example state is: {exampleState ? 'True' : 'False'}</p>
        <button
          onClick={onExampleClick}
        >
          Example
        </button>
      </div>
    </>
  )
}

export default HomePage
