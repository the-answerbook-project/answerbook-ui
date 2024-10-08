import { Flex, Grid, Text } from '@radix-ui/themes'
import { last } from 'lodash'
import React, { FC, ReactNode } from 'react'

import { numberToRoman } from '../../utils/common'
import Markdown from '../Markdown'

interface SectionProps {
  sectionId: string
  description?: string
  children: ReactNode
}

const Section: FC<SectionProps> = ({ sectionId, description, children }) => {
  return (
    <Grid columns="1fr 8fr">
      <Text weight="bold" id={`q${sectionId}`}>
        {numberToRoman(Number(last(sectionId.split('-'))))})
      </Text>
      <Flex gap="3" direction="column">
        {description && <Markdown>{description}</Markdown>}
        {children}
      </Flex>
    </Grid>
  )
}

export default Section
