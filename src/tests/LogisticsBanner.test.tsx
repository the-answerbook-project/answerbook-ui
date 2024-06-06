import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import { format } from 'date-fns'
import React from 'react'

import LogisticsBanner, { DATE_FMT } from '../components/LogisticsBanner'

describe('LogisticsBanner', () => {
  it('renders correct text when the assessment is not started', () => {
    const start = new Date(Date.now() + 1000 * 60 * 60) // 1 hour in the future
    const end = new Date(Date.now() + 1000 * 60 * 60 * 2) // 2 hours in the future

    render(<LogisticsBanner start={start} end={end} />)

    expect(screen.getByRole('status')).toHaveAttribute('data-accent-color', 'blue')
    expect(screen.getByText(`begins ${format(start, DATE_FMT)} (UK time)`)).toBeInTheDocument()
  })

  it('renders correct text  when the assessment is open', () => {
    const start = new Date(Date.now() - 1000 * 60 * 60) // 1 hour in the past
    const end = new Date(Date.now() + 1000 * 60 * 60) // 1 hour in the future

    render(<LogisticsBanner start={start} end={end} />)

    expect(screen.getByRole('status')).toHaveAttribute('data-accent-color', 'amber')
    expect(screen.getByText(`ends ${format(end, DATE_FMT)} (UK time)`)).toBeInTheDocument()
  })

  it('renders correct text  when the assessment is closed', () => {
    const start = new Date(Date.now() - 1000 * 60 * 60 * 2) // 2 hours in the past
    const end = new Date(Date.now() - 1000 * 60 * 60) // 1 hour in the past

    render(<LogisticsBanner start={start} end={end} />)

    expect(screen.getByRole('status')).toHaveAttribute('data-accent-color', 'red')
    expect(screen.getByText(`ended ${format(end, DATE_FMT)} (UK time).`)).toBeInTheDocument()
  })
})
