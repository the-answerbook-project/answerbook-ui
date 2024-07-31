import {
  Box,
  Button,
  Card,
  Container,
  Flex,
  Heading,
  Section,
  Text,
  TextField,
} from '@radix-ui/themes'
import React, { FC, useState } from 'react'

import { useAuthentication } from '../hooks/authentication'

const LoginPage: FC = () => {
  const { getToken } = useAuthentication()
  const initialCreds = { username: '', password: '' }
  const [credentials, setCredentials] = useState(initialCreds)

  const handleCredsChange = (key: 'username' | 'password') => (e) =>
    setCredentials((credentials) => ({ ...credentials, [key]: e.target.value }))

  return (
    <Section>
      <Container size="1">
        <Card size="4">
          <Box p="6">
            <Heading mb="5" size="6">
              Log in
            </Heading>
            <Flex direction="column" gap="4">
              <Box>
                <Text as="label" weight="bold">
                  Username
                </Text>
                <TextField.Root
                  value={credentials.username}
                  onChange={handleCredsChange('username')}
                  placeholder="Enter your username"
                />
              </Box>
              <Box>
                <Text as="label" weight="bold">
                  Password
                </Text>
                <TextField.Root
                  value={credentials.password}
                  onChange={handleCredsChange('password')}
                  placeholder="Enter your password"
                />
              </Box>
              <Flex justify="end">
                <Button
                  disabled={!credentials.username || !credentials.password}
                  onClick={() => getToken(credentials)}
                >
                  Log in
                </Button>
              </Flex>
            </Flex>
          </Box>
        </Card>
      </Container>
    </Section>
  )
}

export default LoginPage
