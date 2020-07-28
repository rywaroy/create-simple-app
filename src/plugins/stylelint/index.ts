import GeneratorAPI from '../../generator/generatorAPI';
import { IPrettierConfig } from '../../types';

const stylelintPlugin = {
  id: 'stylelint',
  apply: (api: GeneratorAPI) => {
    api.addModulePrompt({
      name: 'Stylelint',
      value: 'stylelint',
    });
    api.addPresetPromptCallBack(({ module }: { module: string[]}) => {
      // 判断是否选择了stylelint
      if (module.includes('stylelint')) {
        api.extendPackage({
          devDependencies: {
            stylelint: '^13.6.1',
            'stylelint-config-standard': '^20.0.0',
          },
        });
        const stylelintConfig = {
          extends: 'stylelint-config-standard',
        };
        api.render('.stylelintrc', `module.exports = ${JSON.stringify(stylelintConfig)}`);
      }
    });
  },
};

export default stylelintPlugin;
