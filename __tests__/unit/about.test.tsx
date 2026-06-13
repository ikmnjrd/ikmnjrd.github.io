import { render } from '@testing-library/preact'
import About from '../../src/pages/about'

/* https://zenn.dev/nskij/articles/f7e8f8baa766e7 */
jest.mock('next/head', () => {
  return {
    __esModule: true,
    default: ({ children }: { children: unknown }) => {
      return <>{children}</>
    },
  }
})

describe('TitleHead', () => {
  test('titleがAboutページを示すこと', () => {
    render(<About />, {
      container: document.head,
    })

    expect(document.title).toBe('About | ikmnjrd.github.io')
  })
})
