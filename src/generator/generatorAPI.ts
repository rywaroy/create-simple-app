import fs from 'fs-extra';
import path from 'path';
import merge from '../utils/merge';
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
   * 复制静态资源
   */
  copy(url: string) {
    fs.copySync(url, this.generator.context);
  }

  /**
   * 渲染静态资源
   */
  render(fileName: string, code: string | object) {
    const target = path.join(this.generator.context, fileName);
    if (typeof code === 'string') {
      fs.writeFileSync(target, code);
    }
    if (typeof code === 'object') {
      fs.writeJSONSync(target, code);
    }
  }
}
