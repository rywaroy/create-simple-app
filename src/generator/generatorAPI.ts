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
  addPresetPrompt(prompt: IPrompt, cb?: IPromptCallBack) {
    this.generator.addPresetPrompts(prompt);
    if (cb) {
      this.generator.addPresetPromptsCallBack(cb);
    }
  }

  /**
   * 判断插件
   */
  hasPlugin(id: string): boolean {
    return this.generator.hasPlugin(id);
  }

  /**
   * webpack 配置
   */
  chainWebpack() {
    return this.generator.config;
  }
}
