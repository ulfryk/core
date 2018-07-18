import { Maybe } from 'monet'

import { ITree } from './tree'

export const getAllNodes = <T extends ITree<T>>(node: T): ReadonlyArray<T> =>
  Maybe.fromNull(node.children).filter(children => children.length > 0)
    .foldLeft([node])((nodes, children) => nodes.concat(children
      .reduce((acc, child) => acc.concat(getAllNodes(child)), [] as ReadonlyArray<T>)))
