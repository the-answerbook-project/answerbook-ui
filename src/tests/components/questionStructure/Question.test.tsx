import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import React from 'react'

import Question from '../../../components/questionStructure/Question'

jest.mock('../../../components/ContextCard', () => ({ text }: { text: string }) => (
  <div data-testid="instructions">{text}</div>
))

describe('Question', () => {
  it('renders correctly with its instructions', () => {
    const instructions = 'Question instructions'
    render(<Question description={instructions}>Child Content</Question>)

    const instructionsElement = screen.getByTestId('instructions')
    expect(instructionsElement).toBeInTheDocument()
  })

  it('renders the children prop correctly', () => {
    const childrenContent = <div data-testid={'children'}></div>
    render(<Question description="some instructions">{childrenContent}</Question>)

    const childrenElement = screen.getByTestId('children')
    expect(childrenElement).toBeInTheDocument()
  })
})
