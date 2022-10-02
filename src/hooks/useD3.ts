import { useRef, useEffect } from 'react'
import * as d3 from 'd3'

export const useD3 = (
  renderChartFn: Function,
  dependencies: unknown
) => {
  const ref = useRef(null)

  useEffect(() => {
    renderChartFn(d3.select(ref.current))
    return () => {}
  }, [dependencies])
  return ref
}
