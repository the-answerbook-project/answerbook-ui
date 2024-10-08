import { Box, Card, Heading } from '@radix-ui/themes'
import React, { FC, ReactNode } from 'react'

import CardBody from '../Card/CardBody'
import CardHeader from '../Card/CardHeader'

interface FormattedCardProps {
  title?: string
  children: ReactNode
}

const FormattedCard: FC<FormattedCardProps> = ({ title, children }) => {
  return (
    <Box width="100%">
      <Card>
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
