const sharp = require('sharp')
const fs = require('fs/promises')
import { existCacheImage } from './existCacheImage'
import { getImageFromWeb } from './getImageFromWeb'

type converterProps = {
  images: RegExpMatchArray | null
  name: string
}
export type ImageConverterProps = {
  url: string
  index: number
  name: string
}

export const optimizeImages = async ({
  images,
  name,
}: converterProps): Promise<string[]> => {
  let output_file_names: string[] = []

  const images_url = images?.map((image: string) => {
    return image
      .match(/src="https:\/\/i\.gyazo.*?"/)
      ?.toString()
      .slice(5, -1)
  })

  if (images_url) {
    for (const [index, image_url] of images_url.entries()) {
      const flag = existCacheImage({
        name: name,
        index: index,
        url: image_url ?? '',
      })

      if (!flag) {
        const fetch_image_path = await getImageFromWeb({
          url: image_url ?? '',
          index: index,
          name: name,
        })

        const file = await fs.readFile(
          process.cwd() + fetch_image_path
        )
        const output_file = `images/posts/${name}-${index}.avif`

        try {
          await sharp(file)
            .resize({ width: 672 })
            .toFormat('avif')
            .toFile('./public/' + output_file)
          output_file_names.push(output_file)
        } catch (e) {
          console.error('Error: ', e)
        }
      } else {
        output_file_names.push(
          `images/posts/${name}-${index}.avif`
        )
      }
    }
  }

  return output_file_names
}
