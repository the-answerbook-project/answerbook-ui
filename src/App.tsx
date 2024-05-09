import React from 'react'
import { Button, Container, Flex, Section, Text } from '@radix-ui/themes'
import NavBar from './components/NavBar'

function App() {
  return (
    <>
      <NavBar questionCount={3} />
      <Section>
        <Container size="2">
          <Flex direction="column" gap="2">
            <Text>Hello from Radix Themes :)</Text>
            <Button>Let's go</Button>
          </Flex>
        </Container>
      </Section>
    </>
  )
}

export default App
