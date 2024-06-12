import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import React from 'react'

import Section from '../../../components/questionStructure/Section'

describe('Section', () => {
  const description = 'This is a section description'
  const childrenContent = 'Child Content'

  it('renders correctly with all props', () => {
    render(
      <Section sectionId={1} description={description}>
        <div data-testid="children">{childrenContent}</div>
      </Section>
    )

    const sectionIdElement = screen.getByText(`i)`)
    const descriptionElement = screen.getByTestId('markdown')
    const childrenElement = screen.getByTestId('children')

    expect(sectionIdElement).toBeInTheDocument()
    expect(descriptionElement).toBeInTheDocument()
    expect(childrenElement).toBeInTheDocument()
    expect(childrenElement).toHaveTextContent(childrenContent)
  })

  it('renders without description', () => {
    render(
      <Section sectionId={1}>
        <div data-testid="children">{childrenContent}</div>
      </Section>
    )

    const sectionIdElement = screen.getByText(`i)`)
    const childrenElement = screen.getByTestId('children')

    expect(sectionIdElement).toBeInTheDocument()
    expect(childrenElement).toBeInTheDocument()
    expect(childrenElement).toHaveTextContent(childrenContent)
    expect(screen.queryByText(description)).not.toBeInTheDocument()
  })
})
