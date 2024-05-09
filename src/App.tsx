import React from 'react'
import { Button, Container, Flex, Section, Text } from '@radix-ui/themes'

function App() {
  return (
    <Section>
      <Container size="2">
        <Flex direction="column" gap="2">
          <Text>Hello from Radix Themes :)</Text>
          <Button>Let's go</Button>
        </Flex>
      </Container>
    </Section>
  )
}

export default App
