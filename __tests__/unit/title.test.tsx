import {
  render,
  screen,
} from '@testing-library/react'
import TitleHead from '~/components/TitleHead'

/* https://zenn.dev/nskij/articles/f7e8f8baa766e7 */
jest.mock('next/head', () => {
  return {
    __esModule: true,
    default: ({
      children,
    }: {
      children: Array<React.ReactElement>
    }) => {
      return <>{children}</>
    },
  }
})

describe('TitleHead', () => {
  test('renders a footer', () => {
    const dummyText = ''
    render(<TitleHead title={dummyText} />, {
      container: document.head,
    })

    expect(document.title).toBe(
      '| ikmnjrd.github.io'
    )
  })
})
