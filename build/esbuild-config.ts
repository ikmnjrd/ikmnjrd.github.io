import * as esbuild from 'esbuild'
import path from 'node:path'

const root = process.cwd()
const resolve = (p: string) => path.resolve(root, p)

// Map React + Next.js specifiers to the local Preact implementation / shims.
// No real Next.js code is referenced anywhere in the build path.
const alias: Record<string, string> = {
  react: 'preact/compat',
  'react-dom': 'preact/compat',
  'react/jsx-runtime': 'preact/jsx-runtime',
  'next/link': resolve('build/shims/next-link.tsx'),
  'next/router': resolve('build/shims/next-router.ts'),
  'next/head': resolve('build/shims/next-head.tsx'),
  'next/app': resolve('build/shims/next-app.ts'),
}

const loader: Record<string, esbuild.Loader> = {
  '.module.css': 'local-css',
  '.css': 'css',
  '.svg': 'file',
  '.png': 'file',
  '.jpg': 'file',
  '.jpeg': 'file',
  '.gif': 'file',
  '.webp': 'file',
  '.woff': 'file',
  '.woff2': 'file',
  '.ttf': 'file',
  '.eot': 'file',
}

const shared: esbuild.BuildOptions = {
  bundle: true,
  jsx: 'automatic',
  jsxImportSource: 'preact',
  alias,
  loader,
  logLevel: 'silent',
}

// Server-only modules reachable from the pages' getStaticProps/getStaticPaths
// (which never run in the browser). Stubbing them keeps Node built-ins and the
// native `sharp` addon out of the client bundle and slims it down.
const SERVER_ONLY =
  /^(node:)?(fs|fs\/promises|path|os|util|stream|child_process|crypto|events|http|https|net|tls|zlib|url|querystring|assert|buffer)$/
const SERVER_ONLY_PKGS = new Set([
  'sharp',
  'node-fetch',
  'detect-libc',
  'gray-matter',
  'markdown-it',
  'markdown-it-anchor',
  'markdown-it-prism',
  'prismjs',
  'feed',
])

// Root-absolute references (e.g. url(/wave.svg) in CSS) point at files served
// from public/ at runtime — leave them as-is instead of trying to bundle them.
const externalAbsolute: esbuild.Plugin = {
  name: 'external-absolute',
  setup(b) {
    b.onResolve({ filter: /^\// }, (args) => {
      // Only CSS url(/...) references; never the JS entry points / real files.
      if (args.kind === 'url-token') {
        return { path: args.path, external: true }
      }
      return undefined
    })
  },
}

const stubServerOnly: esbuild.Plugin = {
  name: 'stub-server-only',
  setup(b) {
    b.onResolve({ filter: /.*/ }, (args) => {
      if (
        SERVER_ONLY.test(args.path) ||
        SERVER_ONLY_PKGS.has(args.path)
      ) {
        return { path: args.path, namespace: 'server-stub' }
      }
      return undefined
    })
    // CommonJS so any named import (existsSync, pipeline, ...) resolves to
    // undefined instead of an "export not found" error. None of it runs on
    // the client.
    b.onLoad({ filter: /.*/, namespace: 'server-stub' }, () => ({
      contents: 'module.exports = {}',
      loader: 'js',
    }))
  },
}

/** Bundles the server renderer for Node and returns the output bundle path. */
export async function buildServer(
  outdir: string
): Promise<string> {
  await esbuild.build({
    ...shared,
    plugins: [externalAbsolute],
    entryPoints: { render: resolve('build/render-entry.tsx') },
    outdir,
    platform: 'node',
    format: 'cjs',
    outExtension: { '.js': '.cjs' },
    // sharp is a native addon; prismjs/markdown-it-prism use dynamic require()
    // for language components which esbuild cannot bundle — keep them external
    // so real Node resolution handles them at render time.
    external: ['sharp', 'prismjs', 'markdown-it-prism'],
    target: 'node18',
  })
  return path.join(outdir, 'render.cjs')
}

export interface ClientAssets {
  js: string // public URL, e.g. /assets/client-XXXX.js
  css: string | null // public URL of the stylesheet, if any
}

/** Bundles + minifies the client hydration entry into `outdir`/assets. */
export async function buildClient(
  docsDir: string
): Promise<ClientAssets> {
  const result = await esbuild.build({
    ...shared,
    plugins: [externalAbsolute, stubServerOnly],
    entryPoints: { client: resolve('build/client-entry.tsx') },
    outdir: path.join(docsDir, 'assets'),
    entryNames: '[name]-[hash]',
    assetNames: '[name]-[hash]',
    platform: 'browser',
    format: 'esm',
    splitting: false,
    // Minify whitespace + syntax but NOT identifiers: identifier minification
    // also renames CSS Module local names (Header_header -> .z), which would
    // not match the non-minified server build's class names in the SSR HTML.
    minifyWhitespace: true,
    minifySyntax: true,
    minifyIdentifiers: false,
    sourcemap: false,
    metafile: true,
    define: { 'process.env.NODE_ENV': '"production"' },
    target: ['es2019'],
  })

  let js = ''
  let css: string | null = null
  for (const file of Object.keys(result.metafile!.outputs)) {
    const rel =
      '/' + path.relative(docsDir, path.resolve(root, file))
    if (file.endsWith('.js')) js = rel
    else if (file.endsWith('.css')) css = rel
  }
  return { js, css }
}
