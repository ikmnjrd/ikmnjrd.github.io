import {
  existCacheImage,
  type ImageConverterProps,
} from '../../src/utils/existCacheImage'

describe('listFilesInDirectorySync', () => {
  jest.mock('fs')

  const MOCK_FILE_INFO = {
    '/path/to/file1.js': 'console.log("file1 contents");',
    '/path/to/file2.txt': 'file2 contents',
    '/path/to/image.png': 'hogehoge',
  }
  const props: ImageConverterProps = {
    url: 'https://i.gyazo.com/mock-1ef68f7e017d8ed2309a6ff90d9036ad.png',
    index: 0,
    name: 'consolelog-effect',
  }

  beforeEach(() => {
    // Set up some mocked out file info before each test
    require('fs').fs.__setMockFiles(MOCK_FILE_INFO)
  })

  test('fn: existCacheImage', () => {
    const isExist = existCacheImage(props)
    expect(isExist).toBe(true)
  })
})
