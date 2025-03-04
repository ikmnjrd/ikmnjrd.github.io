import React from 'react'
import classNames from 'classnames'
import styles from './SvgIcon.module.css'

type Props = {
  type:
    | 'logo'
    | 'rss'
    | 'navigation'
    | 'sun'
    | 'moon'
    | 'x'
    | 'facebook'
    | 'github'
    | 'home'
    | 'clipboard'
    | 'success'
    | 'published'
    | 'modified'
  size: string
  strokeWidth?: number
  classes?: string
  fill?: string
}

const SvgIcon: React.FC<Props> = ({
  type,
  size,
  strokeWidth = 2,
  fill,
  classes,
}) => {
  switch (type) {
    case 'logo':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={classNames(styles.icon, classes)}
          width={size}
          height={size}
          viewBox="0 0 64 64"
          fill={fill || 'none'}
          stroke="currentColor"
          strokeWidth={strokeWidth}
        >
          <circle cx="34.52" cy="11.43" r="5.82" />
          <circle cx="53.63" cy="31.6" r="5.82" />
          <circle cx="34.52" cy="50.57" r="5.82" />
          <circle cx="15.16" cy="42.03" r="5.82" />
          <circle cx="15.16" cy="19.27" r="5.82" />
          <circle cx="34.51" cy="29.27" r="4.7" />
          <line x1="20.17" y1="16.3" x2="28.9" y2="12.93" />
          <line x1="38.6" y1="15.59" x2="49.48" y2="27.52" />
          <line x1="50.07" y1="36.2" x2="38.67" y2="46.49" />
          <line x1="18.36" y1="24.13" x2="30.91" y2="46.01" />
          <line x1="20.31" y1="44.74" x2="28.7" y2="48.63" />
          <line x1="17.34" y1="36.63" x2="31.37" y2="16.32" />
          <line x1="20.52" y1="21.55" x2="30.34" y2="27.1" />
          <line x1="39.22" y1="29.8" x2="47.81" y2="30.45" />
          <line x1="34.51" y1="33.98" x2="34.52" y2="44.74" />
        </svg>
      )
    case 'rss':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={classNames(styles.icon, classes)}
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill={fill || 'none'}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 11a9 9 0 0 1 9 9"></path>
          <path d="M4 4a16 16 0 0 1 16 16"></path>
          <circle cx="5" cy="19" r="1"></circle>
        </svg>
      )
    case 'navigation':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={classNames(styles.icon, classes)}
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill={fill || 'none'}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polygon points="3 11 22 2 13 21 11 13 3 11"></polygon>
        </svg>
      )
    case 'sun':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={classNames(styles.icon, classes)}
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill={fill || 'none'}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line
            x1="18.36"
            y1="18.36"
            x2="19.78"
            y2="19.78"
          ></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
      )
    case 'moon':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={classNames(styles.icon, classes)}
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill={fill || 'none'}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      )
    case 'x':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={classNames(styles.icon, classes)}
          width={size}
          height={size}
          viewBox="0 0 1200 1227"
          fill={fill || 'none'}
        >
          <path
            d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z"
            fill="white"
          />
        </svg>
      )
    case 'facebook':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={classNames(styles.icon, classes)}
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill={fill || 'none'}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
        </svg>
      )
    case 'github':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={classNames(styles.icon, classes)}
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill={fill || 'none'}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
        </svg>
      )
    case 'home':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={classNames(styles.icon, classes)}
          width={size}
          height={size}
          viewBox="0 0 64 64"
          fill={fill || 'none'}
          stroke="currentColor"
          strokeWidth={strokeWidth}
        >
          <path d="M51.61 25.21L33.2 11.4a2 2 0 00-2.4 0L12.39 25.21a2 2 0 00-.8 1.6v26.64a2 2 0 002 2H25a2 2 0 002-2V45a2 2 0 012-2h7a2 2 0 012 2v8.45a2 2 0 002 2h10.41a2 2 0 002-2V26.81a2 2 0 00-.8-1.6z"></path>
        </svg>
      )
    case 'clipboard':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={classNames(styles.icon, classes)}
          width={size}
          height={size}
          viewBox="0 0 64 64"
          fill={fill || 'none'}
          stroke="currentColor"
          strokeWidth={strokeWidth}
        >
          <rect
            x="11.13"
            y="17.72"
            width="33.92"
            height="36.85"
            rx="2.5"
          ></rect>
          <path d="M19.35 14.23v-1.14a3.51 3.51 0 013.33-3.66h26.86a3.51 3.51 0 013.33 3.66v29.53a3.51 3.51 0 01-3.33 3.66h-1.15"></path>
        </svg>
      )
    case 'success':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={classNames(styles.icon, classes)}
          width={size}
          height={size}
          viewBox="0 0 64 64"
          fill={fill || 'none'}
          stroke="currentColor"
          strokeWidth={strokeWidth}
        >
          <circle cx="32" cy="32" r="25.3"></circle>
          <path d="M15.79 37.84l11.03 8.34 19.49-27.36"></path>
        </svg>
      )
    case 'published':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={classNames(styles.icon, classes)}
          width={size}
          height={size}
          viewBox="0 0 64 64"
          fill={fill || 'none'}
          stroke="currentColor"
          strokeWidth={strokeWidth}
        >
          <path d="M45.56 46.83v9.43H7.94V20.6L19.9 7.74h25.66v13.55"></path>
          <path d="M19.92 7.74L19.9 20.6H7.94M13.09 47.67H31.1M13.09 41.14H29.1M13.09 35.04H33.1M13.09 28.94H39.1M34.45 43.23l.15 4.3a.49.49 0 00.62.46l4.13-1.11a.54.54 0 00.34-.23l18.07-24.44a1.23 1.23 0 00-.26-1.72l-3.14-2.34a1.22 1.22 0 00-1.72.26L34.57 42.84a.67.67 0 00-.12.39zM50.2 21.7l5.07 3.87"></path>
        </svg>
      )
    case 'modified':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={classNames(styles.icon, classes)}
          width={size}
          height={size}
          viewBox="0 0 64 64"
          fill={fill || 'none'}
          stroke="currentColor"
          strokeWidth={strokeWidth}
        >
          <path d="M53.72 36.61a21.91 21.91 0 11-3.35-16.51M51.72 7.85l-.87 12.93-12.93-.88M53.72 36.61a21.91 21.91 0 11-3.35-16.51"></path>
          <path d="M51.72 7.85l-.87 12.93-12.93-.88"></path>
        </svg>
      )
    default:
      return null
  }
}

export default SvgIcon
