import { render, screen } from '@testing-library/react'
import Footer from '~/components/Footer'

describe('Footer', () => {
  it('renders a footer', () => {
    render(<Footer />)

    const footerEl = screen.getAllByRole('contentinfo')
    const footerText = screen.getByText(/©︎ikmnjrd/i)

    expect(footerText).toBeInTheDocument()
    expect(footerEl)
  })
  it('footer x link', () => {
    render(<Footer />)

    const xLink = screen.getByTitle(/x/i)
    expect(xLink).toBeInTheDocument()
  })
  it('footer GitHub link', () => {
    render(<Footer />)

    const githubLink = screen.getByTitle(/github/i)
    expect(githubLink).toBeInTheDocument()
  })
  it('footer RSS link', () => {
    render(<Footer />)

    const rssLink = screen.getByTitle(/rss/i)
    expect(rssLink).toBeInTheDocument()
  })
})
