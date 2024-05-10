import React from 'react'
import { Container, Flex, Section, Text } from '@radix-ui/themes'
import NavBar from './components/NavBar'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <NavBar questionCount={3} />
        <Outlet />
      </>
    ),
    children: [
      {
        path: 'frontcover',
        element: (
          <Section>
            <Container size="2">
              <Flex direction="column" gap="2">
                <Text>Frontcover</Text>
              </Flex>
            </Container>
          </Section>
        ),
      },
      {
        path: 'questions/:questionId',
        element: (
          <Section>
            <Container size="2">
              <Flex direction="column" gap="2">
                <Text>Question</Text>
              </Flex>
            </Container>
          </Section>
        ),
      },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
