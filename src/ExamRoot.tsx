import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'

import PageFrame from './PageFrame'
import NavBar from './components/NavBar'

const ExamRoot: FC = () => {
  return (
    <>
      <NavBar questionCount={3} />
      <PageFrame>
        <Outlet />
      </PageFrame>
    </>
  )
}

export default ExamRoot
