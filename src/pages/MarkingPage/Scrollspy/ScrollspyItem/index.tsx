import { Badge, Flex, Link, Separator } from '@radix-ui/themes'
import classNames from 'classnames'
import { isNil } from 'lodash'
import React, { FC } from 'react'
import { useLocation } from 'react-router-dom'

import { NO_MARK } from '../../constants'
import './index.css'

export interface ScrollspyItemProps {
  id: string
  label: string
  partial?: number
  total: number
  indent?: boolean
}

export const ScrollspyItem: FC<ScrollspyItemProps> = ({
  id,
  label,
  partial,
  total,
  indent = false,
}) => {
  const { hash } = useLocation()
  const colour = isNil(partial) ? 'red' : partial === 0 ? 'gray' : 'green'
  const currentHash = `#${id}`
  return (
    <Flex justify="between">
      <Link
        href={currentHash}
        className={classNames(
          indent && 'indented-text',
          (hash === currentHash || hash.startsWith(currentHash)) && 'active-scrollspy-item'
        )}
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
