import { Badge, Separator } from '@radix-ui/themes'
import React, { FC } from 'react'

import { NO_MARK } from './constants'

export interface MarkBadgeProps {
  partial?: number
  total: number
  color: 'red' | 'green' | 'gray'
}

const MarkBadge: FC<MarkBadgeProps> = ({ partial, total, color }) => (
  <Badge radius="full" variant="solid" color={color}>
    {partial ?? NO_MARK} <Separator orientation="vertical" />
    {total}
  </Badge>
)

export default MarkBadge
