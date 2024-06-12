import { Section } from '@radix-ui/themes'
import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'

import NavBar from '../components/NavBar'

const ExamRoot: FC = () => {
  return (
    <>
      <NavBar questionCount={3} />
      <Section pt="9">
        <Outlet />
      </Section>
    </>
  )
}

export default ExamRoot
