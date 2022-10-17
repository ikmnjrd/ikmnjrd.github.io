import { pipeline } from 'node:stream'
import { promisify } from 'node:util'
import type { ImageConverterProps } from './existCacheImage'
export type { ImageConverterProps }
import fetch from 'node-fetch'
import { createWriteStream } from 'node:fs'

export const getImageFromWeb = async ({
  url: url,
  index: index,
  name: name,
}: ImageConverterProps): Promise<string> => {
  const streamPipeline = promisify(pipeline)

  const response = await fetch(url)
  if (!response.body)
    throw new Error(`unexpected response ${response.statusText}`)
  await streamPipeline(
    response.body,
    createWriteStream(`./tmp/${name}-${index}.png`)
  )
  return `/tmp/${name}-${index}.png`
}
