import { Box, Card, Em, Flex, Heading, Text } from '@radix-ui/themes'
import React, { FC, ReactNode } from 'react'

import { numberToLetter } from '../../utils/common'
import Markdown from '../Markdown'
import CardBody from '../cardLayout/CardBody'
import CardFooter from '../cardLayout/CardFooter'
import CardHeader from '../cardLayout/CardHeader'

interface PartProps {
  partId: number
  description?: string
  marksContribution?: number
  onSave: (partId: number) => void
  children: ReactNode
}

const Part: FC<PartProps> = ({ partId, description, children, marksContribution, onSave }) => {
  return (
    <Box width="100%">
      <Card size="3">
        <CardHeader>
          <Heading>Part {numberToLetter(partId)}</Heading>
        </CardHeader>
        <CardBody>
          <Flex gap="4" direction="column">
            {description && <Markdown>{description}</Markdown>}
            <Flex gap="4" direction="column">
              {children}
            </Flex>
          </Flex>
        </CardBody>
        {marksContribution && (
          <CardFooter>
            <Text as="p">
              <Em>This part carries {marksContribution}% of the marks.</Em>
            </Text>
          </CardFooter>
        )}
      </Card>
    </Box>
  )
}

export default Part
