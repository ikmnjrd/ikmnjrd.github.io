import { IPostMeta } from './getPostsMeta'

export const sortByPostMeta = (
  first: IPostMeta,
  second: IPostMeta
) => {
  return sortByDate(
    first.frontmatter.date,
    second.frontmatter.date
  )
}

export const sortByDate = (
  first: string | undefined,
  second: string | undefined
) => {
  return (
    new Date(second ?? '').getTime() -
    new Date(first ?? '').getTime()
  )
}
