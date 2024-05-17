import { Flex, Grid, Strong, Text } from '@radix-ui/themes'
import React, { FC, ReactNode } from 'react'

interface SectionProps {
  sectionId: string
  description?: string
  children: ReactNode
}

const Section: FC<SectionProps> = ({ sectionId, description, children }) => {
  return (
    <Grid columns="1fr 5fr">
      <Text>
        <Strong>{sectionId})</Strong>
      </Text>
      <Flex gap="3" direction="column">
        <Text>{description}</Text>
        {children}
      </Flex>
    </Grid>
  )
}

export default Section
