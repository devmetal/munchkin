'use strict';

const spawn = require('child_process').spawn;
const electronpath = require('./node_modules/electron-prebuilt/index');
const electron = spawn(electronpath, ['.']);

electron.stdout.on('data', data => {
  console.log(`stdout: ${data}`);
});

electron.stderr.on('data', data => {
  console.log(`stderr: ${data}`);
});

electron.on('close', code => {
  console.log(`electron closed with code: ${code}`);
});
