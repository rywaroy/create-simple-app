#!/usr/bin/env node

'use strict';
const fs = require('fs');
const path = require('path');
const { program } = require('commander');
const packageJson = require('../package.json');
const create = require('../lib/create').default;

const currentNodeVersion = process.versions.node;
const semver = currentNodeVersion.split('.');
const major = semver[0];

if (major < 10) {
  console.error('当前node版本过低，需要 Node 10 以上');
  process.exit(1);
}

program
  .version(packageJson.version)
  .arguments('[project]')
  .action((project) => {
    // 在当前文件夹下创建且已有工程
    if (!project && fs.existsSync(path.join(process.cwd(), 'package.json'))) {
      // create(project);
    } else {
      create(project); 
    }
  });

program.parse(process.argv);