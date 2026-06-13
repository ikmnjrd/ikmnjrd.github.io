// CSS Modules & plain CSS / asset imports.
// (Replaces Next.js' built-in ambient declarations, which were removed with next-env.d.ts.)
declare module '*.module.css' {
  const classes: { readonly [key: string]: string }
  export default classes
}

declare module '*.css' {
  const content: string
  export default content
}

declare module '*.svg' {
  const src: string
  export default src
}

// Third-party modules without bundled type definitions.
declare module 'markdown-it-prism' {
  import type MarkdownIt from 'markdown-it'
  const plugin: (
    md: MarkdownIt,
    options?: { defaultLanguage?: string }
  ) => void
  export default plugin
}
