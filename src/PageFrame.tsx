import React, { FC, ReactNode } from 'react'
import { Container, Section } from '@radix-ui/themes'

interface PageFrameProps {
  children: ReactNode
}

const PageFrame: FC<PageFrameProps> = ({ children }) => {
  return (
    <Section>
      <Container size="3">{children}</Container>
    </Section>
  )
}

export default PageFrame
