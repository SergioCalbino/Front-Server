import React from 'react'
import { Route, Routes } from 'react-router-dom'

interface Props {
    children : JSX.Element[] | JSX.Element
}

const RoutesNotFound = ({ children } : Props) => {
  return (
    <Routes>
        {children}
        <Route path='*' element={<div className='mt-16 text-red-800'  > Not Found </div>} />
    </Routes>
  )
}

export default RoutesNotFound