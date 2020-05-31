import { IPlugin } from './plugin';
import { IPackage } from './package';

export interface IGeneratorOtions {
  plugins: IPlugin[],
  pkg: IPackage,
}
