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
          mock.children[0],
          mock.children[0].children[0],
          mock.children[0].children[0].children[0],
          mock.children[1],
          mock.children[1].children[0],
          mock.children[1].children[1],
          mock.children[1].children[2],
          mock.children[2],
          mock.children[3],
          mock.children[3].children[0],
        ]);
      });

      it('should handle empty parameters', () => {
        expect(getAllNodes({} as ITree<any>)).to.deep.equal([{}]);
      });

    });
  });
});
