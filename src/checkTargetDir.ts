import fs from 'fs-extra';
import inquirer from 'inquirer';
import chalk from 'chalk';

export default async function checkTargetDir(targetDir: string) {
  if (fs.existsSync(targetDir)) {
    const { action } = await inquirer.prompt([
      {
        name: 'action',
        type: 'list',
        message: `当前文件夹 ${chalk.cyan(targetDir)} 已经存在. 请选择操作:`,
        choices: [
          { name: '覆盖', value: 'overwrite' },
          { name: '合并', value: 'merge' },
        ],
      },
    ]);
    if (action === 'overwrite') {
      console.log(`\正在删除 ${chalk.cyan(targetDir)}...`);
      await fs.remove(targetDir);
    }
  }
}
