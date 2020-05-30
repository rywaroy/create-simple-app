import validateProjectName from 'validate-npm-package-name';
import chalk from 'chalk';

interface CheckAppNameResult {
  validForNewPackages: boolean;
  validForOldPackages: boolean;
  errors?: string[];
  warnings?: string[];
}

export default function checkAppName(appName: string) {
  const result: CheckAppNameResult = validateProjectName(appName);
  if (!result.validForNewPackages) {
    console.error(
      chalk.red(
        `无法创建 ${chalk.green(
          `"${appName}"`,
        )} 由于 npm 包命名限制:\n`,
      ),
    );
    [
      ...(result.errors || []),
      ...(result.warnings || []),
    ].forEach((error) => {
      console.error(chalk.red(`  * ${error}`));
    });
    console.error(chalk.red('\n请选择另外的应用名.'));
    process.exit(1);
  }
}
