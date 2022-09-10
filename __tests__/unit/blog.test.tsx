import {
  render,
  screen,
} from '@testing-library/react'
import Blog from '~/pages/blog/[slug]'
/*
 * https://github.com/next-page-tester/next-page-tester/pull/294
 */

describe('Blog', () => {
  const frontmatter = {
    title: 'hoge',
    date: '',
    cover_image: undefined,
    description: '説明です',
  }
  const slug = 'this-is-test'
  const innerHtml = `<div>html</div>`

  test('titleが記事名称を示すこと', () => {
    render(
      <Blog
        frontmatter={frontmatter}
        slug={slug}
        innerHtml={innerHtml}
      />,
      {
        container: document.body,
      }
    )

    it('fo', () => {
      // const githubLink =
      //   screen.getByTitle(/github/i)
      // expect(githubLink).toBeInTheDocument()
    })
  })
})
