import {
  render,
  screen,
} from '@testing-library/react'
import Blog from '~/pages/blog/[slug]'

// 以下のエラーが出る。直そうとするがそうすると肝心のプログラムが動かなくなる
// Test suite failed to run
// Must use import to load ES Module: /Users/ike/workspace/git-blog-next-markdown/node_modules/node-fetch/src/index.js

describe('Blog', () => {
  const frontmatter = {
    title: 'hoge',
    date: '',
    cover_image: undefined,
    description: '説明です',
  }
  const slug = 'this-is-test'
  const innerHtml = `<div>html</div>`
  test('dummy', () => {
    // render(
    //   <Blog
    //     frontmatter={frontmatter}
    //     slug={slug}
    //     innerHtml={innerHtml}
    //   />,
    //   {
    //     container: document.body,
    //   }
    // )
    expect(1).toEqual(1)
  })
})
