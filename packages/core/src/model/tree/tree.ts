export interface ITree<T extends ITree<T>> {
  readonly children: ReadonlyArray<T> | null
}
