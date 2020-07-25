import GeneratorAPI from '../../generator/generatorAPI';
import { IPrettierConfig } from '../../types';

const prettierPlugin = {
  id: 'prettier',
  apply: (api: GeneratorAPI) => {
    api.addModulePrompt({
      name: 'Prettier',
      value: 'prettier',
    });
    api.addPresetPromptCallBack(({ module }: { module: string[]}) => {
      // 判断是否选择了prettier
      if (module.includes('prettier')) {
        api.extendPackage({
          devDependencies: {
            prettier: '^2.0.5',
          },
        });
        const prettierConfig: IPrettierConfig = {
          singleQuote: true,
          trailingComma: 'es5',
          printWidth: 100,
          overrides: [
            {
              files: '.prettierrc',
              options: { parser: 'json' },
            },
          ],
        };
        api.render('.prettierrc', prettierConfig);
      }
    });
  },
};

export default prettierPlugin;
