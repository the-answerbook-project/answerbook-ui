import { Container, Flex, Heading, Section } from '@radix-ui/themes'
import React, { FC } from 'react'

interface PageHeaderProps {
  primaryText: string
  secondaryText?: string
}

const Header: FC<PageHeaderProps> = ({ primaryText, secondaryText }) => {
  return (
    <Section pb="0">
      <Container size="4" px="6">
        <Flex gap="2">
          <Heading size="8">{primaryText}</Heading>
          {secondaryText && (
            <Heading size="8" as="h2" color="gray" weight="medium">
              {secondaryText}
            </Heading>
          )}
        </Flex>
      </Container>
    </Section>
  )
}

export default Header
