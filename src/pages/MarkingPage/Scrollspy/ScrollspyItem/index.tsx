import { Badge, Flex, Link, Separator } from '@radix-ui/themes'
import classNames from 'classnames'
import { isNil } from 'lodash'
import React, { FC } from 'react'

import { NO_MARK } from '../../constants'
import './index.css'

export interface ScrollspyItemProps {
  id: string
  active: boolean
  label: string
  partial?: number
  total: number
  indent?: boolean
}

export const ScrollspyItem: FC<ScrollspyItemProps> = ({
  id,
  active,
  label,
  partial,
  total,
  indent = false,
}) => {
  const colour = isNil(partial) ? 'red' : partial === 0 ? 'gray' : 'green'
  return (
    <Flex justify="between">
      <Link
        href={`#${id}`}
        className={classNames(indent && 'indented-text', active && 'active-scrollspy-item')}
      >
        {label}
      </Link>
      <Badge radius="full" variant="solid" color={colour}>
        {partial ?? NO_MARK} <Separator orientation="vertical" color="gray" />
        {total}
      </Badge>
    </Flex>
  )
}
