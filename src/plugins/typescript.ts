import GeneratorAPI from '../generator/generatorAPI';

const typescriptPlugin = {
  id: 'typescript',
  apply: (api: GeneratorAPI) => {
    api.addModulePrompt({
      name: 'Typescript',
      value: 'typescript',
    });
    api.addPresetPromptCallBack(({ module }: { module: string[]}) => {
      // 判断是否选择了typescript
      if (module.includes('typescript')) {
        api.extendPackage({
          devDependencies: {
            typescript: '^3.9.5',
          },
        });
        const tsConfig = {
          compilerOptions: {
            target: 'es5',
            module: 'es2015',
            allowJs: true,
            jsx: 'react',
            noImplicitAny: true,
            strictNullChecks: true,
            noImplicitThis: true,
            noImplicitReturns: true,
            moduleResolution: 'node',
            esModuleInterop: true,
          },
          include: [
            'src/**/*',
          ],
          exclude: [
            'node_modules',
            '**/*.spec.ts',
            'dist',
            'build',
            'lib',
          ],
        };
        api.render('tsconfig.json', tsConfig);
      }
    });
  },
};

export default typescriptPlugin;
