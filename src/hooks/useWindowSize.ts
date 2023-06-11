import { useEffect, useState } from 'react'
import { isBrowser, off, on } from '~/utils/browser'

// Inspiration from react-use:
// https://github.com/streamich/react-use/blob/master/src/misc/util.ts

export const useWindowSize = (
  initialWidth = Infinity,
  initialHeight = Infinity
) => {
  const [state, setState] = useState<{
    width: number
    height: number
  }>({
    width: isBrowser ? window.innerWidth : initialWidth,
    height: isBrowser ? window.innerHeight : initialHeight,
  })

  useEffect((): (() => void) | void => {
    if (isBrowser) {
      const handler = () => {
        setState({
          width: window.innerWidth,
          height: window.innerHeight,
        })
      }

      on(window, 'resize', handler)

      return () => {
        off(window, 'resize', handler)
      }
    }
  }, [])

  return state
}
