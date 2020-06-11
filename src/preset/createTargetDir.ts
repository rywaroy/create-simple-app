import fs from 'fs-extra';
import inquirer from 'inquirer';
import chalk from 'chalk';

export default async function createTargetDir(projectName: string, targetDir: string) {
  if (projectName !== '.') { // 如果在当前目录下创建则不创建额外文件夹
    if (fs.existsSync(targetDir)) {
      const { action } = await inquirer.prompt([
        {
          name: 'action',
          type: 'confirm',
          message: `当前文件夹 ${chalk.cyan(targetDir)} 已经存在. 是否覆盖:`,
        },
      ]);
      if (action) {
        console.log(`正在删除 ${chalk.cyan(targetDir)}...`);
        fs.removeSync(targetDir);
        fs.ensureDirSync(targetDir);
      }
    } else {
      fs.ensureDirSync(targetDir);
    }
  }
}
