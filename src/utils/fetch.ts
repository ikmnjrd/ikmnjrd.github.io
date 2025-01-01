export const myFetch = <T extends any>(
  url: string
): Promise<T> => {
  const headers = new Headers()
  headers.append('Content-Type', 'application/json')
  headers.append('Accept', 'application/json')
  return fetch(url, { headers }).then((res) => res.json())
}
