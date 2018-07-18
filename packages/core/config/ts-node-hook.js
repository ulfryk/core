// https://stackoverflow.com/questions/40635956/overriding-tsconfig-json-for-ts-node-in-mocha
require('ts-node').register({
  project: 'tsconfig/cjs.json',
  typeCheck: true,
})
