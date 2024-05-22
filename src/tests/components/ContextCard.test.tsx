import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import React from 'react'

import ContextCard from '../../components/ContextCard'

describe('ContextCard', () => {
  it('renders correctly with its heading', () => {
    render(<ContextCard text="Test Context" />)

    const headingElement = screen.getByRole('heading', { name: /context/i })
    expect(headingElement).toBeInTheDocument()
  })

  it('renders the correct text passed as a prop', () => {
    const testText = 'Some text'
    render(<ContextCard text={testText} />)

    const textElement = screen.getByRole('paragraph')

    expect(textElement).toBeInTheDocument()
    expect(textElement).toHaveTextContent(testText)
  })
})
