#!/usr/bin/env node

'use strict';

const currentNodeVersion = process.versions.node;
const semver = currentNodeVersion.split('.');
const major = semver[0];

if (major < 10) {
  console.error('当前node版本过低，需要 Node 10 以上');
  process.exit(1);
}

require('../lib');
