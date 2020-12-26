export function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function objectToArray(snapshot) {
  if (snapshot) {
    return Object.entries(snapshot).map(e => {
      const [k, v] = e
      return Object.assign({}, v, {id: k})
    })
  }
}

export function creatDateTree(data) {
  let obj = {}
  data.forEach((a) => obj[a.id] = {...a, childNodes: []})
  let tree = []
  data.forEach(a => {
    if (a.parentId !== 0) {
      obj[a.parentId].childNodes.push(obj[a.id])
    } else {
      tree.push(obj[a.id])
    }
  })
  return tree
}

export const log = console.log.bind(console)

