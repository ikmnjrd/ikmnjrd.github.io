import { useD3 } from '~/hooks/useD3'
import * as d3Sankey from 'd3-sankey'
// interface SankeyNode extends d3Sankey.SankeyNodeMinimal

interface Node {
  id: number
  name: string
}
interface Link {
  [k: string]: number
}

interface Props {
  nodes: Node[]
  links: Link[]
  lastIndex: number
}

function SankeyChart(props: Props) {
  console.log({ props })

  const ref = useD3(
    (svg: SVGSVGElement) => {
      const width = 640 // outer width, in pixels
      const height = 1200 // outer height, in pixels
      const nodeLabelPadding = 5

      const sankey = d3Sankey
        .sankey<unknown[], any>()
        .size([width, height])
        .nodeId((d) => d.id)
        .nodeWidth(20)
        .nodePadding(10)
        .nodeAlign(d3Sankey.sankeyCenter)
        .extent([
          [0, 0],
          [width, height],
        ])

      const graph = sankey(props)

      // let links =
      svg
        .append('g')
        .classed('links', true)
        .selectAll('path')
        .data(graph.links)
        .enter()
        .append('path')
        .classed('link', true)
        .attr(
          'd',
          d3Sankey.sankeyLinkHorizontal()
        )
        .attr('fill', 'none')
        .attr('stroke', '#999999')
        .attr('stroke-width', (d) => d.width)
        .attr('stoke-opacity', 0.5)

      console.log('graph nodes:', graph.nodes)

      // let nodes =
      svg
        .append('g')
        .classed('nodes', true)
        .selectAll('rect')
        .data(graph.nodes)
        .enter()
        .append('rect')
        .classed('node', true)
        .attr('x', (d) => d.x0)
        .attr('y', (d) => d.y0)
        .attr('width', (d) => d.x1 - d.x0)
        .attr('height', (d) => d.y1 - d.y0)
        .attr('fill', 'blue')
        .attr('opacity', 0.8)

      svg
        .append('g')
        .attr('font-family', 'sans-serif')
        .attr('font-size', 12)
        .selectAll('text')
        .data(
          graph.nodes.filter(
            (i) =>
              i.x0 > 50 ||
              i.index < props.lastIndex
          )
        )
        .join('text')
        .attr('x', (d) =>
          d.x0 < width / 2
            ? d.x1 + nodeLabelPadding
            : d.x0 - nodeLabelPadding
        )
        .attr('y', (d) => (d.y1 + d.y0) / 2)
        .attr('dy', '0.35em')
        .attr('text-anchor', (d) =>
          d.x0 < width / 2 ? 'start' : 'end'
        )
        .insert('a')
        .attr('xlink:href', function (d) {
          return d.url
        })
        .text((i) => i.name)
        .style('fill', '#222222')

      return svg
    },
    [props]
  )

  return (
    <svg
      ref={ref}
      style={{
        height: 1200,
        width: '100%',
        marginRight: '0px',
        marginLeft: '0px',
      }}
    ></svg>
  )
}

export default SankeyChart
