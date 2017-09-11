export interface IBindDecorator {
  (target: any, key: string, descriptor: PropertyDescriptor): void;
  readonly all: (target: any) => void;
  readonly key: Symbol;
  readonly static: (target: any, key: string, descriptor: PropertyDescriptor) => PropertyDescriptor;
  readonly to: (target: any) => void;
}

const key = Symbol(' A list of methods to bind ;) ');

// tslint:disable-next-line:strict-boolean-expressions
const getCurrent = (source: any): Set<string> => source[key] || new Set<string>();

const Bind: IBindDecorator =
  ((target: any, propertyKey: string, _descriptor: PropertyDescriptor) => {
    target[key] = getCurrent(target).add(propertyKey);
  }) as any;

Object.assign(Bind, {

  all: (target: any) => {
    target.prototype[key] = Object.keys(target.prototype)
      .reduce((keys, targetKey) => keys.add(targetKey), getCurrent(target.prototype));
  },

  key,

  static: <T>(__: T, ___: string, descriptor: PropertyDescriptor): PropertyDescriptor => {

    const { value, writable, ...rest } = descriptor;

    return {
      ...rest,
      get(this: T) {
        return value.bind(this);
      },
    };

  },

  to: (target: any) => {
    Array.from(getCurrent(target))
      .filter(targetKey => target[targetKey] instanceof Function)
      .forEach(targetKey => {
        target[targetKey] = target[targetKey].bind(target);
      });
  },

});

export { Bind };
