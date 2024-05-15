import { Outlet } from 'react-router-dom'
import React, { FC } from 'react'
import NavBar from './components/NavBar'
import PageFrame from './PageFrame'

interface ExamRootProps {
  questionCount: number
}

const ExamRoot: FC<ExamRootProps> = (props) => {
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
