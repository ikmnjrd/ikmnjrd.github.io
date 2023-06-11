import { useEffect, useRef, Ref } from 'react'
import * as d3 from 'd3'

type RenderChartFnProps = {
  svg: d3.Selection<SVGSVGElement, unknown, null, undefined>
  width: number
  height: number
}

export const useD3 = (
  dependencies: unknown[],
  // eslint-disable-next-line no-unused-vars
  renderChartFn: (props: RenderChartFnProps) => void
): Ref<SVGSVGElement> => {
  const ref = useRef<SVGSVGElement>(null)
  const DEFAULT_WIDTH = 640
  const DEFAULT_HEIGHT = 1400

  useEffect(() => {
    const current = ref?.current
    if (!current) return

    const width = ref?.current!.clientWidth ?? DEFAULT_WIDTH
    const height = DEFAULT_HEIGHT

    renderChartFn({ svg: d3.select(current), width, height })
    return () => {
      d3.select(current).selectAll('*').remove()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies)

  return ref
}
