import { Box, Button, Card, Em, Flex, Heading, Separator, Text } from '@radix-ui/themes'
import React, { FC, ReactNode } from 'react'

interface PartProps {
  partId: string
  description?: string
  marksContribution?: number
  children: ReactNode
}

const Part: FC<PartProps> = ({ partId, description, children, marksContribution }) => {
  const Header = () => {
    return (
      <Flex justify="between">
        <Heading>Part {partId}</Heading>
        <Button onClick={() => console.log(`Part ${partId} saved`)}>Save</Button>
      </Flex>
    )
  }

  const Footer = () => {
    return (
      <>
        <Separator size="4" />
        <Text>
          <Em>This part carries {marksContribution}% of the marks.</Em>
        </Text>
      </>
    )
  }

  return (
    <Box width="100%">
      <Card size="3">
        <Flex gap="4" direction="column">
          <Header />
          {description && <Text>{description}</Text>}
          <Flex gap="4" direction="column">
            {children}
          </Flex>
          {marksContribution && <Footer />}
        </Flex>
      </Card>
    </Box>
  )
}

export default Part
