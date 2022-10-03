import { useEffect, createRef, Ref } from 'react'
import * as d3 from 'd3'

export const useD3 = (
  renderChartFn: Function,
  dependencies: unknown[]
): Ref<SVGSVGElement> => {
  const ref = createRef<SVGSVGElement>()

  useEffect(() => {
    renderChartFn(d3.select(ref.current))
    return () => {}
  }, dependencies)

  return ref
}
