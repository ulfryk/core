export interface ITree<T extends ITree<T>> {
  readonly children: T[] | null;
}
