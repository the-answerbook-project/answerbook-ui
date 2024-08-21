import { Flex, Grid, Strong, Text } from '@radix-ui/themes'
import React, { FC, ReactNode } from 'react'

import { numberToRoman } from '../../utils/common'
import Markdown from '../Markdown'

interface SectionProps {
  sectionId: number
  description?: string
  children: ReactNode
}

const Section: FC<SectionProps> = ({ sectionId, description, children }) => {
  return (
    <Grid columns="1fr 8fr">
      <Text>
        <Strong>{numberToRoman(sectionId)})</Strong>
      </Text>
      <Flex gap="3" direction="column">
        {description && <Markdown>{description}</Markdown>}
        {children}
      </Flex>
    </Grid>
  )
}

export default Section
