import { Box, Inset } from '@radix-ui/themes'
import React, { FC } from 'react'

import './index.css'

interface CardFooterProps {
  children?: React.ReactNode
}

const CardFooter: FC<CardFooterProps> = ({ children }) => (
  <Inset clip="padding-box" side="bottom" className={'card-footer'}>
    <Box px="4" py="2">
      {children}
    </Box>
  </Inset>
)

export default CardFooter
