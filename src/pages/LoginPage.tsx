import { ExclamationTriangleIcon } from '@radix-ui/react-icons'
import {
  Box,
  Button,
  Callout,
  Card,
  Container,
  Flex,
  Heading,
  Section,
  Text,
  TextField,
} from '@radix-ui/themes'
import React, { FC, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { useAuthentication } from '../hooks/authentication'

const DEFAULT_REDIRECT = '../frontcover'
const LoginPage: FC = () => {
  const { state } = useLocation()
  const navigate = useNavigate()
  const { authError, requestToken } = useAuthentication()
  const initialCreds = { username: '', password: '' }
  const [credentials, setCredentials] = useState(initialCreds)

  const handleCredsChange = (key: 'username' | 'password') => (e) =>
    setCredentials((credentials) => ({ ...credentials, [key]: e.target.value }))

  const handleCredsSubmission = () =>
    requestToken(credentials).then(() =>
      navigate(state?.prev ?? DEFAULT_REDIRECT, { relative: 'path' })
    )

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
                  onClick={handleCredsSubmission}
                >
                  Log in
                </Button>
              </Flex>
              {authError && (
                <Callout.Root color="red">
                  <Callout.Icon>
                    <ExclamationTriangleIcon />
                  </Callout.Icon>
                  <Callout.Text>{authError}</Callout.Text>
                </Callout.Root>
              )}
            </Flex>
          </Box>
        </Card>
      </Container>
    </Section>
  )
}

export default LoginPage
