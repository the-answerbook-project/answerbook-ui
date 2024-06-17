import { Card as CardRoot } from '@radix-ui/themes'
import { FC, ReactNode } from 'react'

import './index.css'

interface CardProps {
  children: ReactNode
}

const Card: FC<CardProps> = ({ children }) => (
  <CardRoot className={'card-base'}>{children}</CardRoot>
)

export default Card
