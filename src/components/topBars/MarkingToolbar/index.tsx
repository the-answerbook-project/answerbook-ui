import { Section } from '@radix-ui/themes'
import React, { FC } from 'react'

import CandidateSelector, { CandidateSelectorProps } from './components/CandidateSelector'

interface ToolbarProps {
  candidateSelectorProps: CandidateSelectorProps
}

const MarkingToolbar: FC<ToolbarProps> = ({ candidateSelectorProps }) => {
  return (
    <Section
      p="3"
      position="fixed"
      top="0"
      width="100%"
      style={{ backgroundColor: 'var(--gray-8)', zIndex: 1000 }}
    >
      <CandidateSelector {...candidateSelectorProps} />
    </Section>
  )
}

export default MarkingToolbar
