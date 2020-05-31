import fs from 'fs-extra';
import inquirer from 'inquirer';
import chalk from 'chalk';
import path from 'path';

export default async function createTargetDir(projectName: string, targetDir: string) {
  if (projectName !== '.') { // 如果在当前目录下创建则不创建额外文件夹
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
        console.log(`正在删除 ${chalk.cyan(targetDir)}...`);
        fs.removeSync(targetDir);
        fs.ensureDirSync(targetDir);
      }
    } else {
      fs.ensureDirSync(targetDir);
    }
  }
}
