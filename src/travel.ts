export async function travel<T>(tree: T[], cb: (node: T) => any, opt: { subNodeName: string } = { subNodeName: 'children' }) {
  const { subNodeName } = opt
  const newTree: T[] = []

  for await (const node of tree) {
    const newNode = await Promise.resolve(cb(node))

    const subNode = Reflect.get(node as any, subNodeName)
    if (subNode)
      newNode[subNodeName] = await travel(subNode, cb, opt)

    newTree.push(newNode)
  }

  return newTree
}

export function travelSync <T>(tree: T[], cb: (node: T) => any, opt: { subNodeName: string } = { subNodeName: 'children' }) {
  const { subNodeName } = opt
  return tree.map((node) => {
    const newNode = cb(node)

    const subNode = Reflect.get(node as any, subNodeName)
    if (subNode)
      newNode[subNodeName] = travelSync(subNode, cb, opt)

    return newNode
  })
}
