import git from 'isomorphic-git'
import fs from 'fs'
import dayjs from 'dayjs'
import { nonNullable } from './filterElements'
import { sortByDate } from './sort'

export async function getDateFromGit(slug: string) {
  const gitdir = '.git'
  const filepath = `_posts/${slug}.md`
  const commits = await git.log({
    fs,
    gitdir,
    filepath,
  })

  const dates = commits
    .flatMap((commit) => {
      const committers = commit.payload.match(
        /(?<=committer\s).*/g
      )
      if (!committers) return null

      const dates = committers.map((commiter) => {
        const rawTime = (commiter.match(/\d{10}/) ?? [null])[0]
        if (!rawTime) return null

        return getDateFromUnixTime(parseInt(rawTime, 10))
      })

      return dates.filter(nonNullable)
    })
    .filter(nonNullable)

  // 重複した要素の削除
  /// https://1-notes.com/javascript-remove-duplicate-values-from-array/
  const newDates = Array.from(new Set(dates))
  // 最近の日付が先頭,昔の日付が末尾
  const sortedDateArray = newDates.sort(sortByDate)

  return {
    createdAt:
      sortedDateArray[sortedDateArray.length - 1] ?? 'hoge',
    updatedAt: sortedDateArray[0],
  }
}

function getDateFromUnixTime(unixTimeInSeconds: number) {
  return dayjs(unixTimeInSeconds * 1000).format('YYYY-MM-DD')
}
