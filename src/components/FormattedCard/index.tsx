import { Box, Card, Flex, Heading } from '@radix-ui/themes'
import React, { FC, ReactNode } from 'react'

interface FormattedCardProps {
  title?: string
  children: ReactNode
}

const FormattedCard: FC<FormattedCardProps> = ({ title, children }) => {
  return (
    <Box width="100%">
      <Card size="3">
        <Flex gap="4" direction="column">
          {title && <Heading>{title}</Heading>}
          {children}
        </Flex>
      </Card>
    </Box>
  )
}

export default FormattedCard
