import fs from 'fs'
import path from 'path'

const targetDir = '_posts'
const ignoreDirs = ['draft']

export const getPostsDirs = () => {
  return fs
    .readdirSync(path.join(targetDir))
    .filter((filename) => !ignoreDirs.includes(filename))
}
