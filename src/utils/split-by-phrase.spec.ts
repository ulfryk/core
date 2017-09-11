import { expect } from 'chai';
import { Maybe, None, Some } from 'monet';

import { splitByPhrase } from './split-by-phrase';

const normalizedSplit = (phrase: Maybe<string>, text: string) =>
  splitByPhrase(phrase, text)
    .orJust([None(), None(), None()])
    .map(p => p.orNull());

describe('utils', () => {

  describe('splitByPhrase(a, b)', () => {

    it('should be a function', () => {
      expect(splitByPhrase).to.be.an.instanceof(Function);
    });

    it('should split phrase by it\'s substring', () => {
      expect(normalizedSplit(Some(' be a '), 'should be a function'))
        .to.deep.equal(['should', ' be a ', 'function']);
      expect(normalizedSplit(Some('should be '), 'should be a function'))
        .to.deep.equal([null, 'should be ', 'a function']);
      expect(normalizedSplit(Some(' be a function'), 'should be a function'))
        .to.deep.equal(['should', ' be a function', null]);
    });

    it('should return empty output on no-match', () => {
      expect(splitByPhrase(Some(' by a '), 'should be a function')).to.deep.equal(None());
      expect(splitByPhrase(Some('not should'), 'should be a function')).to.deep.equal(None());
      expect(splitByPhrase(Some('not a function'), 'should be a function')).to.deep.equal(None());
    });

  });

});
