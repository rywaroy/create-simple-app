#!/usr/bin/env node

'use strict';
const { program } = require('commander');
const packageJson = require('../package.json');
const create = require('../lib/create');

const currentNodeVersion = process.versions.node;
const semver = currentNodeVersion.split('.');
const major = semver[0];

if (major < 10) {
  console.error('当前node版本过低，需要 Node 10 以上');
  process.exit(1);
}

program
  .version(packageJson.version)
  .command('create [project]')
  .action((project) => {
    create(project);
  });

program.parse(process.argv);