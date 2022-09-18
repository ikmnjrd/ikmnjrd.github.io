import {
  existCacheImage,
  type ImageConverterProps,
} from '~/utils/existCacheImage'

jest.mock('fs')

describe('listFilesInDirectorySync', () => {
  const MOCK_FILE_INFO = {
    '/path/to/file1.js':
      'console.log("file1 contents");',
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
    require('fs').fs.__setMockFiles(
      MOCK_FILE_INFO
    )
  })

  test('includes all files in the directory in the summary', () => {
    // const FileSummarizer = require('../FileSummarizer')
    // const fileSummary =
    //   FileSummarizer.summarizeFilesInDirectorySync(
    //     '/path/to'
    //   )
    const hoge = existCacheImage(props)

    expect(hoge).toBe(true)
  })
})

// IsolatedModuleとしてコンパイルするために必要
export {}
