import { Badge, Flex, Separator, Text } from '@radix-ui/themes'
import { isNil } from 'lodash'
import React, { FC } from 'react'

import { NO_MARK } from '../constants'
import './index.css'

export interface ScrollspyItemProps {
  label: string
  partial?: number
  total: number
  indent?: boolean
}

export const ScrollspyItem: FC<ScrollspyItemProps> = ({
  label,
  partial,
  total,
  indent = false,
}) => {
  const colour = isNil(partial) ? 'red' : partial === 0 ? 'gray' : 'green'

  return (
    <Flex justify="between">
      <Text className={indent ? 'indented-text' : ''}>{label}</Text>
      <Badge radius="full" variant="solid" color={colour}>
        {partial ?? NO_MARK} <Separator orientation="vertical" color="gray" />
        {total}
      </Badge>
    </Flex>
  )
}
