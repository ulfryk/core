import { bindAll } from 'lodash' // TODO: Add tests and get rid of lodash dependency

export interface IBindDecorator {
  (target: any, key: string, descriptor: PropertyDescriptor): void
  readonly all: (target: any) => void
  readonly key: Symbol
  readonly static: (target: any, key: string, descriptor: PropertyDescriptor) => PropertyDescriptor
  readonly to: (target: any) => void
}

const key = Symbol(' A list of methods to bind ) ')

// tslint:disable-next-line:strict-boolean-expressions
const getCurrent = (source: any): Set<string> => source[key] || new Set<string>()

const Bind: IBindDecorator =
  ((target: any, propertyKey: string, _descriptor: PropertyDescriptor) => {
    target[key] = getCurrent(target).add(propertyKey)
  }) as any

Object.assign(Bind, {

  all: (target: any) => {
    target.prototype[key] = Object.keys(target.prototype)
      .reduce((keys, targetKey) => keys.add(targetKey), getCurrent(target.prototype))
  },

  key,

  static: (
    __: any,
    name: string,
    descriptor: PropertyDescriptor,
  ): PropertyDescriptor => {

    const { value, writable, ...rest } = descriptor
    const bindStaticKey = Symbol(`'__BIND_STATIC__'${name}`)

    return {
      ...rest,
      get(this: any) {
        return (this[bindStaticKey] || value).bind(this)
      },
      set(this: any, fn: Function) {
        this[bindStaticKey] = fn
      },
    }

  },

  to: (target: any) => {
    bindAll(target, Array.from(getCurrent(target))
      .filter(targetKey => target[targetKey] instanceof Function))
  },

})

export { Bind }
