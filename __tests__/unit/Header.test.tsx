import { render, screen } from '@testing-library/react'
import Header from '~/components/Header'
import { UserContext } from '~/hooks/useUserContext'

const darkModeValue = {
  isDarkMode: true,
  handleChangeDarkMode: () => {},
}
const notDarkModeValue = {
  isDarkMode: false,
  handleChangeDarkMode: () => {},
}

describe('Header', () => {
  beforeEach(() => {
    render(
      <UserContext.Provider value={darkModeValue}>
        <Header />
      </UserContext.Provider>
    )
  })

  it('Dark Mode is enabled', () => {
    const imgEl = screen.getByAltText('Dark Mode Status is true')

    expect(imgEl).toBeInTheDocument()
  })

  it('Dark Mode is not enabled', () => {
    render(
      <UserContext.Provider value={notDarkModeValue}>
        <Header />
      </UserContext.Provider>
    )
    const imgEl = screen.getByAltText(
      'Dark Mode Status is false'
    )

    expect(imgEl).toBeInTheDocument()
  })
})
