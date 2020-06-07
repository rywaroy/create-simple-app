import GeneratorAPI from '../../generator/generatorAPI';

const installPlugin = {
  id: 'install',
  apply: (api: GeneratorAPI) => {
    api.addPresetPrompt({
      name: 'type',
      type: 'list',
      message: '使用npm/yarn/cpnm',
      choices: [
        { name: 'npm', value: 'npm i' },
        { name: 'yarn', value: 'yarn' },
        { name: 'cnpm', value: 'cnpm i' },
      ],
    });
  },
};

export default installPlugin;
