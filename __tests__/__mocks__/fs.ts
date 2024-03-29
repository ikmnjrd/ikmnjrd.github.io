import path from 'path'
import fs from 'node:fs'

const fsMock = jest.createMockFromModule<
  typeof fs & { __setMockFiles: object }
>('fs')

// const existSync =
//   jest.genMockFromModule('existSync')

// This is a custom function that our tests can use during setup to specify
// what the files on the "mock" filesystem should look like when any of the
// `fs` APIs are used.
let mockFiles = Object.create(null)
function __setMockFiles(newMockFiles: object) {
  mockFiles = Object.create(null)
  for (const file in newMockFiles) {
    const dir = path.dirname(file)

    if (!mockFiles[dir]) {
      mockFiles[dir] = []
    }
    mockFiles[dir].push(path.basename(file))
  }
}

// A custom version of `readdirSync` that reads from the special mocked out
// file list set via __setMockFiles
function existSync(directoryPath: fs.PathLike) {
  // return mockFiles[directoryPath as any] || []
  return true
}

fsMock.__setMockFiles = __setMockFiles
fsMock.existsSync = existSync

module.exports = { fs: fsMock }
