import { Box, Inset } from '@radix-ui/themes'
import React, { FC } from 'react'

import './index.css'

interface CardHeaderProps {
  children?: React.ReactNode
  colour?: 'green' | 'red'
}

const CardHeader: FC<CardHeaderProps> = ({ children, colour }) => (
  <Inset clip="padding-box" side="top" className={`card-header-${colour ?? 'default'}`}>
    <Box px="4" py="2">
      {children}
    </Box>
  </Inset>
)

export default CardHeader
