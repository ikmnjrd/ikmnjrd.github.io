import {
  getImageFromWeb,
  type ImageConverterProps,
} from '../../src/utils/getImageFromWeb'

jest.mock('../../src/utils/getImageFromWeb')

const mockGetImageFromWeb =
  getImageFromWeb as jest.MockedFunction<typeof getImageFromWeb>

describe('getImageFromWeb', () => {
  const props: ImageConverterProps = {
    url: 'https://i.gyazo.com/mock-1ef68f7e017d8ed2309a6ff90d9036ad.png',
    index: 0,
    name: 'consolelog-effect',
  }

  afterEach(() => {
    mockGetImageFromWeb.mockClear()
  })

  test('should be defined', () => {
    expect(getImageFromWeb).toBeDefined()
  })

  test('should be called a time', async () => {
    await mockGetImageFromWeb(props)

    expect(mockGetImageFromWeb).toHaveBeenCalledTimes(1)
  })

  // test('makes correct call', async () => {
  //   const fetched = await getImageFromWeb(props)
  //   expect(fetched).toBe('')
  // })

  // test('returns correct data', () => {
  //   mockedFetch = getMockedFetch()
  //   // ...
  // })
})
