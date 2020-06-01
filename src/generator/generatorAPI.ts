import { merge } from 'lodash';
import fs from 'fs-extra';
import Generator from './index';
import { IPrompt, IPromptCallBack, IModulePrompt } from '../types';

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
    this.generator.addPresetPrompt(prompt);
    if (cb) {
      this.generator.addPresetPromptCallBack(cb);
    }
  }

  /**
   * 添加预设回调
   */
  addPresetPromptCallBack(cb: IPromptCallBack) {
    this.generator.addPresetPromptCallBack(cb);
  }

  /**
   * 添加模块选项
   */
  addModulePrompt(prompt: IModulePrompt) {
    this.generator.addModulePrompt(prompt);
  }

  /**
   * 判断插件
   */
  hasPlugin(id: string) {
    return this.generator.hasPlugin(id);
  }

  /**
   * webpack 配置
   */
  chainWebpack() {
    return this.generator.config;
  }

  /**
   * package.json 配置
   */
  extendPackage(object: any) {
    merge(this.generator.pkg, object);
  }

  /**
   * 渲染静态资源
   */
  render(url: string) {
    fs.copySync(url, this.generator.context);
  }
}
