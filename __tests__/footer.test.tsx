import {
  render,
  screen,
} from '@testing-library/react'
import Footer from '~/components/Footer'

describe('Footer', () => {
  it('renders a footer', () => {
    render(<Footer />)

    const footerEl = screen.getAllByRole(
      'contentinfo'
    )
    const footerText =
      screen.getByText(/©︎ikmnjrd/i)

    expect(footerText).toBeInTheDocument()
    expect(footerEl)
  })
  it('footer Twitter link', () => {
    render(<Footer />)

    const twitterLink =
      screen.getByTitle(/twitter/i)
    expect(twitterLink).toBeInTheDocument()
  })
  it('footer GitHub link', () => {
    render(<Footer />)

    const githubLink =
      screen.getByTitle(/github/i)
    expect(githubLink).toBeInTheDocument()
  })
})
