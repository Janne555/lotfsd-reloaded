export function deCamel(text: string) {
  return text.replace(/(?<=[a-z])[A-Z]/gm, value => ` ${value}`)
}

export function range(range: number) {
  return [...Array(range)].map((_, i) => i)
}

export function partition<T>(array: T[], filter: (value: T) => boolean): [T[], T[]] {
  return array.reduce((items, current) => {
    if (filter(current)) {
      items[0].push(current)
    } else {
      items[1].push(current)
    }
    return items
  }, [[], []] as [T[], T[]])
}

export function chunk<T>(arr: T[], size: number): T[][] {
  let chunks: T[][] = []
  let current: T[] = []
  chunks.push(current)

  arr.forEach(item => {
    if (current.length >= size) {
      current = []
      chunks.push(current)
    }
    current.push(item)
  })

  return chunks
}
