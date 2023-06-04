import { useD3 } from '~/hooks/useD3'
import {
  sankey,
  sankeyLinkHorizontal,
  sankeyCenter,
} from 'd3-sankey'
import * as d3 from 'd3'

export interface Node {
  name: string // tag
  id: number // tag name
  url: string
}
export interface Link {
  source: number | string // slug
  target: number | string // tag name
  value: number
}

interface Props {
  nodes: Node[]
  links: Link[]
  lastIndex: number
}

function SankeyChart(props: Props) {
  const width = 640 // outer width, in pixels
  const height = 1400 // outer height, in pixels

  function padZero(num?: number): number {
    return num ?? 0
  }

  const ref = useD3(
    (svg: d3.Selection<SVGSVGElement, any, any, any>) => {
      const nodeLabelPadding = 5

      const mySankey = sankey<Node, Link>()
        .size([width, height])
        .nodeId((d) => d.id)
        .nodeWidth(20)
        .nodePadding(10)
        .nodeAlign(sankeyCenter)
        .extent([
          [0, 0],
          [width, height * 1.1], // SVG一番上のテキストの上半分が見切れてしまうため対応
        ])

      const graph = mySankey(props)

      // let links =
      svg
        .append('g')
        .classed('links', true)
        .selectAll('path')
        .data(graph.links)
        .enter()
        .append('path')
        .classed('link', true)
        .attr('d', sankeyLinkHorizontal())
        .attr('fill', 'none')
        .attr('stroke', '#A0FFFF')
        .attr('stroke-width', (d) => d.width || null)
        .attr('stoke-opacity', 0.5)

      // console.log('graph nodes:', graph.nodes)

      // let nodes =
      svg
        .append('g')
        .classed('nodes', true)
        .selectAll('rect')
        .data(graph.nodes)
        .enter()
        .append('rect')
        .classed('node', true)
        .attr('x', (d) => padZero(d.x0))
        .attr('y', (d) => padZero(d.y0))
        .attr('width', (d) => padZero(d.x1) - padZero(d.x0))
        .attr('height', (d) => padZero(d.y1) - padZero(d.y0))
        .attr('fill', '#6E7F8D')
        .attr('opacity', 0.8)

      svg
        .append('g')
        .attr('font-family', 'sans-serif')
        .attr('font-size', 12)
        .selectAll('text')
        .data(
          graph.nodes.filter(
            (i) =>
              (i.x0 ?? 0) > 50 ||
              (i.index ?? 0) < props.lastIndex
          )
        )
        .join('text')
        .attr('x', (d) =>
          (d.x0 ?? 0) < width / 2
            ? (d.x1 ?? 0) + nodeLabelPadding
            : (d.x0 ?? 0) - nodeLabelPadding
        )
        .attr('y', (d) => (padZero(d.y1) + padZero(d.y0)) / 2)
        .attr('dy', '0.35em')
        .attr('text-anchor', (d) =>
          padZero(d.x0) < width / 2 ? 'start' : 'end'
        )
        .insert('a')
        .attr('xlink:href', function (d) {
          return d.url
        })
        .classed(
          'hover:opacity-50 hover:underline active:opacity-30',
          true
        )
        .text((i) => i.name)
        .style('fill', '#6E7F8D')
    },
    [props.nodes]
  )

  return (
    <svg
      ref={ref}
      style={{
        height: height,
        width: '100%',
        marginRight: '0px',
        marginLeft: '0px',
      }}
    ></svg>
  )
}

export default SankeyChart
