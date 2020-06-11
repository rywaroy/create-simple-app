import { IPackage } from '../types';
import { isArray, isBasic, isObject } from './util';

function mergeProps(object: any, source: any) {
  Object.keys(source).forEach((key) => {
    if (object[key] === undefined) {
      object[key] = source[key];
    } else {
      if (isBasic(source[key])) {
        if (isBasic(object[key])) {
          object[key] = source[key];
        } else if (isArray(object[key])) {
          object[key].push(source[key]);
        }
      }

      if (isObject(source[key])) {
        if (isArray(object[key])) {
          object[key].push(source[key]);
        } else if (isObject(object[key])) {
          mergeProps(object[key], source[key]);
        } else {
          object[key] = source[key];
        }
      }

      if (isArray(source[key])) {
        if (isArray(object[key])) {
          object[key] = object[key].concat(source[key]);
        } else if (isObject(object[key])) {
          source[key].push(object[key]);
          object[key] = source[key];
        } else {
          source[key].push(object[key]);
          object[key] = source[key];
        }
      }
    }
  });
}

export default function merge(object: IPackage, source: IPackage) {
  mergeProps(object, source);
}
