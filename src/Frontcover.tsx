import { Text } from '@radix-ui/themes'
import React, { FC } from 'react'

import Body from './components/pageStructure/Body'
import Header from './components/pageStructure/Header'

const Frontcover: FC = () => {
  return (
    <>
      <Header label="60005" title="Networks and Web Security" />
      <Body>
        <Text>Frontcover</Text>
      </Body>
    </>
  )
}

export default Frontcover
