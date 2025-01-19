import { useContext } from 'react'
import { UserContext } from '../hooks/useUserContext'
import styles from './DarkModeButton.module.css'

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
        className={styles.icon}
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
