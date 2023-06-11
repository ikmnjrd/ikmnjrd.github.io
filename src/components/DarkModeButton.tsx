import { useContext } from 'react'
import { UserContext } from '~/hooks/useUserContext'

type DarkModeButtonProps = {
  className?: string
}

export default function DarkModeButton({
  className,
}: DarkModeButtonProps) {
  const { isDarkMode, handleChangeDarkMode } =
    useContext(UserContext)

  return (
    <button
      onClick={handleChangeDarkMode}
      className={className}
      aria-label="Toggle Theme"
    >
      <img
        width="24px"
        height="24px"
        className="svg-icon md:w-10 hover:opacity-50 active:opacity-30"
        src={`/${
          isDarkMode
            ? 'nights_stay_white_24dp'
            : 'light_mode_white_24dp'
        }.svg`}
        alt={'Dark Mode Status is ' + isDarkMode}
        aria-hidden="true"
      />
    </button>
  )
}
