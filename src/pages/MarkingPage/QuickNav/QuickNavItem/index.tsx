import { Flex, Link } from '@radix-ui/themes'
import classNames from 'classnames'
import React, { FC } from 'react'

import MarkBadge, { MarkBadgeProps } from '../../MarkBadge'
import './index.css'

export interface QuickNavProps {
  id: string
  label: string
  indent?: boolean
  badgeProps: MarkBadgeProps
}

export const QuickNavItem: FC<QuickNavProps> = ({ id, label, badgeProps, indent = false }) => {
  return (
    <Flex justify="between">
      <Link color="gray" href={`#${id}`} className={classNames(indent && 'indented-text')}>
        {label}
      </Link>
      <MarkBadge {...badgeProps} />
    </Flex>
  )
}
