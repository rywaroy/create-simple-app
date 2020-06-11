export interface IPackage {
  name?: string;
  version?: string;
  scripts?: object;
  devDependencies?: object;
  dependencies?: object;
  [prop: string]: any
}
