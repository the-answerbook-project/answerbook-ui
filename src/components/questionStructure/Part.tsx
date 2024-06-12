import { Box, Button, Card, Em, Flex, Heading, Separator, Text } from '@radix-ui/themes'
import React, { FC, ReactNode } from 'react'

import { numberToLetter } from '../../utils'
import Markdown from '../Markdown'

interface PartProps {
  partId: number
  description?: string
  marksContribution?: number
  onSave: (partId: number) => void
  children: ReactNode
}

const Part: FC<PartProps> = ({ partId, description, children, marksContribution, onSave }) => {
  const Header = () => {
    return (
      <Flex justify="between">
        <Heading>Part {numberToLetter(partId)}</Heading>
        <Button onClick={() => onSave(partId)}>Save</Button>
      </Flex>
    )
  }

  const Footer = () => {
    return (
      <>
        <Separator size="4" />
        <Text as="p">
          <Em>This part carries {marksContribution}% of the marks.</Em>
        </Text>
      </>
    )
  }

  return (
    <Box width="100%">
      <Card size="3">
        <Flex gap="4" direction="column">
          <Header />
          {description && <Markdown>{description}</Markdown>}
          <Flex gap="4" direction="column">
            {children}
          </Flex>
          {marksContribution && <Footer />}
        </Flex>
      </Card>
    </Box>
  )
}

export default Part
