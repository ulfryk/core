/* tslint:disable:no-magic-numbers */
import { expect } from 'chai';

import { getAllNodes } from './get-all-nodes';
import { ITree } from './tree';

const mock: ITree<any> = {
  children: [
    {
      children: [{ children: [{ children: null }] }],
    },
    {
      children: [{ children: null }, { children: null }, { children: null }],
    },
    {
      children: null,
    },
    {
      children: [{ children: null }],
    },
  ],
};

describe('model', () => {
  describe('tree', () => {
    describe('getAllNodes()', () => {

      it('should get an array of all nodes in a hierarchy', () => {
        expect(getAllNodes(mock)).to.deep.equal([
          mock,
          (mock.children as ITree<any>[])[0],
          ((mock.children as ITree<any>[])[0].children as ITree<any>[])[0],
          (((mock.children as ITree<any>[])[0].children as ITree<any>[])[0]
            .children as ITree<any>[])[0],
          (mock.children as ITree<any>[])[1],
          ((mock.children as ITree<any>[])[1].children as ITree<any>[])[0],
          ((mock.children as ITree<any>[])[1].children as ITree<any>[])[1],
          ((mock.children as ITree<any>[])[1].children as ITree<any>[])[2],
          (mock.children as ITree<any>[])[2],
          (mock.children as ITree<any>[])[3],
          ((mock.children as ITree<any>[])[3].children as ITree<any>[])[0],
        ]);
      });

      it('should handle empty parameters', () => {
        expect(getAllNodes({} as ITree<any>)).to.deep.equal([{}]);
      });

    });
  });
});
