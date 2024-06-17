import { Box } from '@radix-ui/themes'
import React, { FC } from 'react'

interface CardBodyProps {
  children?: React.ReactNode
}

const CardBody: FC<CardBodyProps> = ({ children }) => <Box py="4">{children}</Box>

export default CardBody
