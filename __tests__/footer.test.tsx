import { render, screen } from '@testing-library/react'
import Footer from '@/components/Footer'

describe('Footer', () => {
  it('renders a heading', () => {
    render(<Footer />)

    const footerText = screen.getByText(/©︎ikmnjrd/i)

    expect(footerText).toBeInTheDocument()
  })
})