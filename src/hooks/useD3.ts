import { useEffect, createRef, Ref } from 'react'
import * as d3 from 'd3'

export const useD3 = (
  dependencies: unknown[],
  renderChartFn: Function
): Ref<SVGSVGElement> => {
  const ref = createRef<SVGSVGElement>()

  useEffect(() => {
    const current = ref.current
    renderChartFn(d3.select(current))
    return () => {
      d3.select(current).selectAll('*').remove()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies)

  return ref
}
