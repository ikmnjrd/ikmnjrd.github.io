import { useState, useEffect } from "react"
// import Image from 'next/image'
// import moonPic from 'public/nights_stay_white_24dp.svg'
// import sunPic from 'public/light_mode_white_24dp.svg'

type DarkModeButtonProps = {
  className?: string
}

export default function DarkModeButton ({className} :DarkModeButtonProps) {
  const [darkMode, setDarkMode] = useState<boolean>();


  useEffect(() => {
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      setDarkMode(true)
      document.querySelector('html')?.classList.add('dark')
    } else {
      setDarkMode(false)
      document.querySelector('html')?.classList.remove('dark')
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
    <button onClick={() => handleChangeDarkMode()} className={className}>
      {/* <Image
        src={ darkMode ? moonPic : sunPic}
        alt="Picture of the author"
        className="svg-icon w-6 md:w-10 hover:opacity-50 active:opacity-30"
        width={32}
        height={32}
        // blurDataURL="data:..." automatically provided
        // placeholder="blur" // Optional blur-up while loading
      /> */}
      <img className="svg-icon w-6 md:w-10 hover:opacity-50 active:opacity-30" src={`/${ darkMode ? "nights_stay_white_24dp": "light_mode_white_24dp"}.svg`} />
    </button>
  )
}