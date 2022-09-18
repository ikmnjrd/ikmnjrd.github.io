import { existsSync } from 'node:fs'
import { ImageConverterProps } from './ImageOptimizer'

export const existCacheImage = ({
  url: url,
  index: index,
  name: name,
}: ImageConverterProps): boolean => {
  try {
    const slash_parsed_url = url
      ?.split('/')
      ?.reverse()[0]
    const ext = slash_parsed_url
      ?.split('.')
      .reverse()[0]
    const file = `${process.cwd()}/tmp/${name}-${index}.${ext}`

    if (existsSync(file)) {
      console.info('Exist Cache Image')
      return true
    }
  } catch (e) {
    console.error('Error: ', e)
  }

  return false
}
