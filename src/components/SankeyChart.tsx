import { useContext } from 'react'
import {
  sankey,
  sankeyLinkHorizontal,
  sankeyCenter,
} from 'd3-sankey'
import { useD3 } from '../hooks/useD3'
import { useWindowSize } from '../hooks/useWindowSize'
import { UserContext } from '../hooks/useUserContext'
import styles from './SankeyChart.module.css'

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
  const { width: windowWidth } = useWindowSize()
  const { isDarkMode } = useContext(UserContext)
  // heightは固定
  let height = 1400

  const ref = useD3(
    [windowWidth, isDarkMode, props.nodes, props.links],
    ({ svg, width, height: _height }) => {
      const nodeLabelPadding = 5
      const strokeColor = isDarkMode ? '#808000' : '#A0FFFF'
      const fillColor = isDarkMode ? '#fff' : '#6E7F8D'
      height = _height

      const yPadding = 7

      const mySankey = sankey<Node, Link>()
        .size([width, height])
        .nodeId((d) => d.id)
        .nodeWidth(20)
        .nodePadding(yPadding)
        .nodeAlign(sankeyCenter)
        .extent([
          [0, yPadding], // SVG一番上のテキストの上半分が見切れてしまうため対応
          [width, height - yPadding],
        ])

      const graph = mySankey(props)

      function padZero(num?: number): number {
        return num ?? 0
      }

      // links
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
        .attr('stroke', strokeColor)
        .attr('stroke-width', (d) => d.width || null)
        .attr('stoke-opacity', 0.5)

      // nodes
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
        .attr('fill', fillColor)
        .attr('opacity', 0.8)

      // node labels
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
        .attr('xlink:href', (d) => d.url)
        .classed(styles.link, true)
        .text((i) => i.name)
        .style('fill', fillColor)
    }
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
