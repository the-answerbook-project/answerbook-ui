import { Container, Flex, Heading, Section } from '@radix-ui/themes'
import React, { FC } from 'react'

interface PageHeaderProps {
  label: string
  title?: string
}

const Header: FC<PageHeaderProps> = ({ label, title }) => {
  return (
    <Section style={{ backgroundColor: 'var(--gray-a3)' }}>
      <Container size="4" px="6">
        <Flex gap="2">
          <Heading size="8">{label}</Heading>
          {title && (
            <Heading size="8" as="h2" color="gray" weight="medium">
              {title}
            </Heading>
          )}
        </Flex>
      </Container>
    </Section>
  )
}

export default Header
