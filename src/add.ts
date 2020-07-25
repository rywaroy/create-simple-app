import path from 'path';
import fs from 'fs';
import Generator from './generator';
import { IPromptResult } from './types';
import eslint from './plugins/eslint';
import install from './plugins/install';
import jest from './plugins/jest';
import prettier from './plugins/prettier';

export default function add(promptResult?: IPromptResult) {
  const pkgPath = path.join(process.cwd(), 'package.json');
  if (!fs.existsSync(pkgPath)) {
    return null;
  }
  const pkg = JSON.parse(fs.readFileSync(pkgPath).toString());
  // 初始化Generator类型
  const generator = new Generator(process.cwd(), {
    plugins: [eslint, install, jest, prettier],
    pkg,
    promptResult,
  });

  return generator;
}
