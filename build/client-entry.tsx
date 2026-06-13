// Client entry: hydrates the server-rendered page in place. All page CSS is
// pulled into the bundle's stylesheet via the imports in ./app.
import { hydrate } from 'preact'
import { App, type RouteKind } from './app'

declare global {
  interface Window {
    __PAGE_DATA__?: {
      route: RouteKind
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      props: any
    }
  }
}

const data = window.__PAGE_DATA__
const container = document.getElementById('__app')

if (container && data) {
  hydrate(
    <App route={data.route} props={data.props} />,
    container
  )
}
