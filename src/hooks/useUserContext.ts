import { useState, useEffect, createContext } from 'react'

export const UserContext = createContext({
  isDarkMode: false,
  handleChangeDarkMode: () => {},
})

export const useUserContext = () => {
  const [isDarkMode, setDarkMode] = useState(false)

  useEffect(() => {
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)')
          .matches)
    ) {
      setDarkMode(true)
      document.documentElement.classList.add('dark')
    } else {
      setDarkMode(false)
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  const handleChangeDarkMode = () => {
    if (isDarkMode) {
      localStorage.theme = 'light'
      setDarkMode(false)
    } else {
      localStorage.theme = 'dark'
      setDarkMode(true)
    }
  }

  return {
    isDarkMode,
    handleChangeDarkMode,
  }
}
