import GeneratorAPI from '../generator/generatorAPI';

export interface IPlugin {
  id: string;
  apply: (api: GeneratorAPI) => void;
}
