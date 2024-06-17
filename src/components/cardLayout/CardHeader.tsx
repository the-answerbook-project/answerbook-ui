import { Box, Inset } from '@radix-ui/themes'
import React, { FC } from 'react'

import './index.css'

interface CardHeaderProps {
  children?: React.ReactNode
  variant?: 'success' | 'danger' | 'default'
}

const CardHeader: FC<CardHeaderProps> = ({ children, variant }) => (
  <Inset clip="padding-box" side="top" className={`card-header-${variant ?? 'default'}`}>
    <Box px="4" py="2">
      {children}
    </Box>
  </Inset>
)

export default CardHeader
