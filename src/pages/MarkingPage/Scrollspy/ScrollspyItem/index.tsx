import { Flex, Link } from '@radix-ui/themes'
import classNames from 'classnames'
import React, { FC } from 'react'

import MarkBadge, { MarkBadgeProps } from '../../MarkBadge'
import './index.css'

export interface ScrollspyItemProps {
  id: string
  active: boolean
  label: string
  indent?: boolean
  badgeProps: MarkBadgeProps
}

export const ScrollspyItem: FC<ScrollspyItemProps> = ({
  id,
  active,
  label,
  badgeProps,
  indent = false,
}) => {
  return (
    <Flex justify="between">
      <Link
        color="gray"
        href={`#${id}`}
        className={classNames(indent && 'indented-text', active && 'active-scrollspy-item')}
      >
        {label}
      </Link>
      <MarkBadge {...badgeProps} />
    </Flex>
  )
}
