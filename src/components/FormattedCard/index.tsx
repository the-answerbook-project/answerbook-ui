import { Box, Card, Heading } from '@radix-ui/themes'
import React, { FC, ReactNode } from 'react'

import CardBody from '../cardLayout/CardBody'
import CardHeader from '../cardLayout/CardHeader'

interface FormattedCardProps {
  title?: string
  children: ReactNode
}

const FormattedCard: FC<FormattedCardProps> = ({ title, children }) => {
  return (
    <Box width="100%">
      <Card size="3">
        {title && (
          <CardHeader>
            <Heading>{title}</Heading>
          </CardHeader>
        )}
        <CardBody>{children}</CardBody>
      </Card>
    </Box>
  )
}

export default FormattedCard
