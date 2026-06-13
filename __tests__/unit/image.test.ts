import {
  mkdirSync,
  writeFileSync,
  rmSync,
  existsSync,
} from 'node:fs'
import path from 'node:path'
import {
  existCacheImage,
  type ImageConverterProps,
} from '../../src/utils/existCacheImage'

// existCacheImage looks for `${cwd}/tmp/${name}-${index}.${ext}`.
// We create/remove that file ourselves so the result does not depend on a
// pre-existing build cache.
describe('existCacheImage', () => {
  const props: ImageConverterProps = {
    url: 'https://i.gyazo.com/mock-1ef68f7e017d8ed2309a6ff90d9036ad.png',
    index: 0,
    name: 'consolelog-effect',
  }
  const cacheFile = path.join(
    process.cwd(),
    'tmp',
    `${props.name}-${props.index}.png`
  )

  afterEach(() => {
    if (existsSync(cacheFile)) rmSync(cacheFile)
  })

  test('returns true when the cached image exists', () => {
    mkdirSync(path.dirname(cacheFile), { recursive: true })
    writeFileSync(cacheFile, 'dummy')

    expect(existCacheImage(props)).toBe(true)
  })

  test('returns false when the cached image is absent', () => {
    if (existsSync(cacheFile)) rmSync(cacheFile)

    expect(existCacheImage(props)).toBe(false)
  })
})
