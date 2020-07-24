import { IPlugin } from './plugin';
import { IPackage } from './package';
import { IPromptResult } from './prompt';

export interface IGeneratorOtions {
  plugins: IPlugin[];
  pkg: IPackage;
  promptResult?: IPromptResult;
}
