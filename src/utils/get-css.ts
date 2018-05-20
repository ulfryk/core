import { Map, Set } from 'immutable';
import { isString } from 'lodash';

export interface IStyles {
  readonly [className: string]: string;
}

const wrapString = (s?: string) => JSON.stringify(s);

const getKey = (__: any, key?: string) => key;

/* tslint:disable:no-console */
const assertStylesClasses = (mapping: Map<string, string>, styles: IStyles): void => {
  const stylesCss = Set(Object.keys(styles));
  const classesCss = mapping.valueSeq().toSet();

  console.assert(
    classesCss.every((className?: string) => stylesCss.has(className as string)),
    `CSS: "styles" should contain all "classes", but got it's missing: ` +
    classesCss.subtract(stylesCss).map(wrapString).join(', '));

  const nonStringClasses = mapping.filterNot(isString);
  console.assert(
    nonStringClasses.isEmpty(),
    'CSS: All "classes" values should be strings, but got non string values under keys: ' +
    nonStringClasses.map(getKey).map(wrapString).join(', '));

  const nonStringStyles = Map<string, string>(styles).filterNot(isString);
  console.assert(
    nonStringStyles.isEmpty(),
    'CSS: All "styles" values should be strings, but got non string values under keys: ' +
    nonStringStyles.map(getKey).map(wrapString).join(', '));

  // https://regex101.com/r/AzZx1A/1
  const invalidStyles = Map<string, string>(styles)
    .filterNot((className?: string) => /^[a-zA-Z_][\d\w-_]*$/.test(className as string));
  console.assert(
    invalidStyles.isEmpty(),
    'CSS: All "styles" values should be valid CSS classes, but got invalid values under keys: ' +
    invalidStyles.map(getKey).map(wrapString).join(', '));
};
/* tslint:enable:no-console */

export const getCSS = <T extends object>(classes: T, styles: IStyles): T => {
  const mapping = Map<string, string>(classes);

  if (process.env.NODE_ENV !== 'production') {
    assertStylesClasses(mapping, styles);
  }

  return mapping.map((className?: string) => styles[className as string]).toObject() as T;
};
