import { Section } from '@radix-ui/themes'
import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'

import ExamNavBar from '../components/ExamNavBar'

const ExamRoot: FC = () => {
  return (
    <>
      <ExamNavBar questionCount={3} />
      <Section pt="9">
        <Outlet />
      </Section>
    </>
  )
}

export default ExamRoot
