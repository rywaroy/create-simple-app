export function isObject(arg: any): boolean {
  return Object.prototype.toString.call(arg) === '[object Object]';
}

export function isArray(arg: any): boolean {
  return Object.prototype.toString.call(arg) === '[object Array]';
}

export function isBasic(arg:any): boolean {
  return typeof arg === 'string' || typeof arg === 'number';
}
