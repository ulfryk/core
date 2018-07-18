import { expect } from 'chai';

import { QueueAction } from './action';
import { Queue } from './queue';

const getAction = (output: string, timeout: number): QueueAction<string> =>
  () => new Promise((resolve, _reject) => {
    setTimeout(() => {
      resolve(output);
    }, timeout);
  });

const getFailedAction = (rejection: string, timeout: number): QueueAction<string> =>
  () => new Promise((_resolve, reject) => {
    setTimeout(() => {
      reject(new Error(rejection));
    }, timeout);
  });

// tslint:disable:no-magic-numbers
describe('Queue', () => {

  it('should not start tasks when pending buffer is full', done => {
    const queue = new Queue(3);
    const output = [] as string[];

    const a = queue.runTask(getAction('first', 500)).then(data => {
      output.push(data);
    });

    const b = queue.runTask(getAction('second', 400)).then(data => {
      output.push(data);
    });

    const c = queue.runTask(getAction('third', 300)).then(data => {
      output.push(data);
    });

    const d = queue.runTask(getAction('fourth', 300)).then(data => {
      output.push(data);
    });

    const e = queue.runTask(getAction('fifth', 10)).then(data => {
      output.push(data);
    });

    const f = queue.runTask(getAction('sixth', 140)).then(data => {
      output.push(data);
    });

    const g = queue.runTask(getAction('seventh', 10)).then(data => {
      output.push(data);
    });

    Promise.all([a, b, c, d, e, f, g]).then(() => {
      expect(output).to.deep.equal([ // 0    -                 "first", "second", "third" starts
        'third',                     // 300  - "third"   ends, "fourth" starts
        'second',                    // 400  - "second"  ends, "fifth"  starts
        'fifth',                     // 410  - "fifth"   ends, "sixth"  starts
        'first',                     // 500  - "first"   ends, "seventh" starts
        'seventh',                   // 510  - "seventh" ends
        'sixth',                     // 550  - "sixth"   ends
        'fourth',                    // 600  - "fourth"  ends
      ]);
    }).then(done, done);
  });

  it('should not break when any action fails', done => {
    const queue = new Queue(3);
    const output = [] as string[];

    const a = queue.runTask(getAction('first', 500)).then(data => {
      output.push(data);
    });

    const b = queue.runTask(getFailedAction('second failed', 400)).catch(err => err);

    const c = queue.runTask(getAction('third', 300)).then(data => {
      output.push(data);
    });

    const d = queue.runTask(getAction('fourth', 300)).then(data => {
      output.push(data);
    });

    const e = queue.runTask(getAction('fifth', 10)).then(data => {
      output.push(data);
    });

    Promise.all([a, b, c, d, e]).then(() => {
      /*
       * 0   -                  "first", "second", "third" starts,
       * 300 - "third"   ends,  "fourth" starts,
       * 400 - "second"  fails, "fifth" starts,
       * 410 - "fifth"   ends,
       * 500 - "first"   ends,
       * 600 - "fourth"  ends,
       */
      expect(output).to.deep.equal(['third', 'fifth', 'first', 'fourth']);
    }).then(done, done);
  });

});
