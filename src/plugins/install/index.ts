import execa from 'execa';
import ora from 'ora';
import GeneratorAPI from '../../generator/generatorAPI';


const installPlugin = {
  id: 'install',
  apply: (api: GeneratorAPI) => {
    api.addPresetPrompt({
      name: 'type',
      type: 'list',
      message: '使用npm/yarn/cpnm',
      choices: [
        { name: 'none', value: '' },
        { name: 'npm', value: 'npm i' },
        { name: 'yarn', value: 'yarn' },
        { name: 'cnpm', value: 'cnpm i' },
      ],
    }, ({ type }) => {
      if (type) {
        api.generator.on('after-create', () => {
          const spinner = ora('安装依赖中\n').start();
          const exec = execa.command(type, {
            cwd: api.generator.context,
          });
          exec.on('close', () => {
            spinner.succeed('安装成功');
          });
        });
      }
    });
  },
};

export default installPlugin;
