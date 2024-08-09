import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import React from 'react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'

import ExamNavBar from '../../components/topBars/ExamNavBar'

describe('NavBar', () => {
  const renderWithRouter = (ui, { route = '/' } = {}) => {
    return render(
      <MemoryRouter initialEntries={[route]}>
        <Routes>
          <Route path="*" element={ui} />
        </Routes>
      </MemoryRouter>
    )
  }

  it('renders with correct links', () => {
    const questionCount = 5
    renderWithRouter(<ExamNavBar questionCount={questionCount} />)

    // Check for static link
    const frontCoverLink = screen.getByRole('link', { name: /frontcover/i })
    expect(frontCoverLink).toBeInTheDocument()
    expect(frontCoverLink).toHaveAttribute('href', 'frontcover')

    // Check for dynamic question links
    for (let i = 1; i <= questionCount; i++) {
      const questionLink = screen.getByRole('link', { name: new RegExp(`question ${i}`, 'i') })
      expect(questionLink).toBeInTheDocument()
    }
  })

  it('highlights the correct active link based on the current path', () => {
    const activeRoute = '/questions/3'
    renderWithRouter(<ExamNavBar questionCount={5} />, { route: activeRoute })

    // Check for active class on the correct link
    const activeLink = screen.getByRole('link', { name: /question 3/i })
    expect(activeLink).toBeInTheDocument()
    expect(activeLink).toHaveAttribute('href', `..${activeRoute}`)
    expect(activeLink).toHaveAttribute('data-active')
  })

  it('renders without crashing with zero questionCount', () => {
    renderWithRouter(<ExamNavBar questionCount={0} />)

    // Check for static link
    const frontCoverLink = screen.getByRole('link', { name: /frontcover/i })
    expect(frontCoverLink).toBeInTheDocument()
    expect(frontCoverLink).toHaveAttribute('href', 'frontcover')

    // Check that no question links are rendered
    const questionLink = screen.queryByRole('link', { name: /Question \d/ })
    expect(questionLink).not.toBeInTheDocument()
  })
})
