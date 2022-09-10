const sharp = require('sharp')
// const fs = require('fs/promises')
const stream = require('stream')
const util = require('util')
const fs = require('fs')

const streamPipeline = util.promisify(
  stream.pipeline
)

type converterProps = {
  images: RegExpMatchArray | null
  name: string
}

type ImageConverterProps = {
  url: string
  index: number
  name: string
}

const getImageFromWeb = async ({
  url: url,
  index: index,
  name: name,
}: ImageConverterProps): Promise<string> => {
  const response = await fetch(url)
  if (!response.ok)
    throw new Error(
      `unexpected response ${response.statusText}`
    )
  await streamPipeline(
    response.body!,
    fs.createWriteStream(
      `./tmp/${name}-${index}.png`
    )
  )
  return `/tmp/${name}-${index}.png`
}

const existCacheImage = ({
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

    if (fs.existsSync(file)) {
      console.info('Exist Cache Image')
      return true
    }
  } catch (e) {
    console.error('Error: ', e)
  }

  return false
}

const converter = async ({
  images,
  name,
}: converterProps): Promise<string[]> => {
  let output_file_names: string[] = []

  const images_url = images?.map(
    (image: string) => {
      return image
        .match(/src="https:\/\/i\.gyazo.*?"/)
        ?.toString()
        .slice(5, -1)
    }
  )

  if (images_url) {
    for (const [
      index,
      image_url,
    ] of images_url.entries()) {
      const flag = existCacheImage({
        name: name,
        index: index,
        url: image_url ?? '',
      })

      if (!flag) {
        const fetch_image_path =
          await getImageFromWeb({
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

export default converter
