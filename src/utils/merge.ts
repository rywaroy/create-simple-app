import { IPackage } from '../types';

function isObject(arg: any): boolean {
  return Object.prototype.toString.call(arg) === '[object Object]';
}

function isArray(arg: any): boolean {
  return Object.prototype.toString.call(arg) === '[object Array]';
}

function mergeProps(object: any, source: any) {
  Object.keys(source).forEach((key) => {
    if (typeof source[key] === 'string' || typeof source[key] === 'number') {
      object[key] = source[key];
    }

    if (isObject(source[key])) {
      mergeProps(object[key], source[key]);
    }
  });
}

export default function merge(object: IPackage, source: IPackage) {
  mergeProps(object, source);
}
