const sharp = require('sharp');
const fs = require('fs/promises');
import {pipeline} from 'node:stream';
import {promisify} from 'node:util'
import  fetch  from 'node-fetch'
import {createWriteStream} from 'node:fs';
const streamPipeline = promisify(pipeline);

type converterProps = {
  images: RegExpMatchArray | null,
  name: string
}


const getImageFromWeb:any = async(url :string, index:number) => {
  const response:any = await fetch(url)
  if (!response.ok) throw new Error(`unexpected response ${response.statusText}`);

  const hoge = await streamPipeline(response.body, createWriteStream(`./tmp/octocat${index}.png`));
  return `/tmp/octocat${index}.png`
}



export default async function converter({images, name}:converterProps) {
  let output_file_names:string[] = [];
  const images_url = images?.map((image:string) => {
    return image.match(/src="https:\/\/i\.gyazo.*?"/)?.toString().slice(5,-1)
  })

  if (images_url) {
    for( const [index, image_url] of images_url.entries() ) {
        console.log("image_url", image_url)

        const web_image = await getImageFromWeb(image_url, index);
        const file = await fs.readFile(process.cwd() + web_image)
        const output_file = `images/posts/test/${name}-${index}.avif`

        try {
          await sharp(file)
              .resize({ width: 672 })
              .toFormat("avif")
              .toFile("./public/" +output_file);
          output_file_names.push(output_file);
        }
        catch (e) {
          console.error('Error: ', e)
        }
    }
  }

  return output_file_names
}


