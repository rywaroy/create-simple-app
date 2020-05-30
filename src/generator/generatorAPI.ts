import Generator from './index';

export default class GeneratorAPI {
  id: string;

  generator: Generator;

  constructor(id: string, generator: Generator) {
    this.id = id;
    this.generator = generator;
  }
}
