import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'

import NavBar from './components/NavBar'

const ExamRoot: FC = () => {
  return (
    <>
      <NavBar questionCount={3} />
      <Outlet />
    </>
  )
}

export default ExamRoot
