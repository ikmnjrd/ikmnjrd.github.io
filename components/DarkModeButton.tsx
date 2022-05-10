import { useState, useEffect } from 'react'
// import moonPic from 'public/nights_stay_white_24dp.svg'
// import sunPic from 'public/light_mode_white_24dp.svg'

type DarkModeButtonProps = {
  className?: string
}

export default function DarkModeButton({ className }: DarkModeButtonProps) {
  const [darkMode, setDarkMode] = useState<boolean>(false)

  useEffect(() => {
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      setDarkMode(true)
      document.documentElement.classList.add('dark')
    } else {
      setDarkMode(false)
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const handleChangeDarkMode = () => {
    if (darkMode) {
      localStorage.theme = 'light'
      setDarkMode(false)
    } else {
      localStorage.theme = 'dark'
      setDarkMode(true)
    }
  }

  return (
    <button
      onClick={() => handleChangeDarkMode()}
      className={className}
      aria-label="Toggle Theme"
    >
      <img
        width="24px"
        height="24px"
        className="svg-icon md:w-10 hover:opacity-50 active:opacity-30"
        src={`/${
          darkMode ? 'nights_stay_white_24dp' : 'light_mode_white_24dp'
        }.svg`}
        alt={'Dark Mode Status is ' + darkMode}
        aria-hidden="true"
      />
    </button>
  )
}
