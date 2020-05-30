import Generator from './index';
import { IPrompt, IPromptCallBack } from '../types';

export default class GeneratorAPI {
  id: string;

  generator: Generator;

  constructor(id: string, generator: Generator) {
    this.id = id;
    this.generator = generator;
  }

  /**
   * 添加预设选项
   */
  addPresetPrompt(prompt: IPrompt, cb: IPromptCallBack) {
    this.generator.presetPrompts.push(prompt);
    this.generator.promptCallBacks.push(cb);
  }
}
