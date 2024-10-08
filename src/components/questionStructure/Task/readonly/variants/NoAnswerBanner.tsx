import { Callout } from '@radix-ui/themes'
import React from 'react'

const NoAnswerBanner = () => (
  <Callout.Root color="blue">
    <Callout.Text>No answer was submitted for this task.</Callout.Text>
  </Callout.Root>
)

export default NoAnswerBanner
