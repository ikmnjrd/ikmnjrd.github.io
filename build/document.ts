import type { RenderedPage } from './render-entry'
import type { ClientAssets } from './esbuild-config'

// Escapes a JSON string for safe embedding inside an inline <script> element:
// neutralises </script> breakouts and the JS line/paragraph separators
// (U+2028 / U+2029, which are valid JSON but break inline scripts).
export function escapeForScript(json: string): string {
  const LS = String.fromCharCode(0x2028)
  const PS = String.fromCharCode(0x2029)
  return json
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
    .split(LS)
    .join('\\u2028')
    .split(PS)
    .join('\\u2029')
}

function gaTags(): string {
  const id = process.env.GA_MEASUREMENT_ID
  if (process.env.NODE_ENV !== 'production' || !id) return ''
  return `<script async src="https://www.googletagmanager.com/gtag/js?id=${id}"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${id}', { page_path: window.location.pathname });
    </script>`
}

// Static <head> content previously provided by src/pages/_document.tsx.
const STATIC_HEAD = `<meta charset="utf-8">
    <meta name="author" content="ikmnjrd">
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
    <link rel="manifest" href="/site.webmanifest">
    <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5">
    <link rel="alternate" type="application/rss+xml" title="ikmnjrd.github.io - rss" href="/rss/feed.xml">
    <meta name="msapplication-TileColor" content="#da532c">
    <meta name="theme-color" content="#ffffff">`

export function renderDocument(
  page: RenderedPage,
  assets: ClientAssets
): string {
  const data = escapeForScript(
    JSON.stringify({ route: page.route, props: page.props })
  )
  const cssLink = assets.css
    ? `<link rel="stylesheet" href="${assets.css}">`
    : ''

  return `<!DOCTYPE html>
<html lang="ja" prefix="og:https://ikmnjrd.github.io/ns#">
  <head>
    ${STATIC_HEAD}
    ${page.headHtml}
    ${cssLink}
    ${gaTags()}
  </head>
  <body class="dark:bg-newmo-800 text-newmo-400 dark:text-newmo-100">
    <div id="__app">${page.bodyHtml}</div>
    <script>window.__PAGE_DATA__=${data}</script>
    <script type="module" src="${assets.js}"></script>
  </body>
</html>
`
}
