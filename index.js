'use strict';

const fs = require('fs');
const path = require('path');
const cp = require('child_process');
const core = require('@actions/core');
// const github = require('@actions/github');

const time = Date.now();
try {
    const script = core.getInput('script');
    const scriptFile = path.join(process.cwd(), script);

    if (!script || !fs.existsSync(scriptFile)) {
        core.setFailed(`The script does not exist: ${script}`);
        return;
    }

    console.log(`Executing the script: ${script}`);
    const child = cp.spawn('node' + (process.platform === 'win32' ? '.cmd' : ''), [
        scriptFile,
    ], {
        cwd: process.cwd(),
        stdio: [0, 1, 2],
    });

    child.on('exit', (code) => {
        if (code !== 0) {
            core.setOutput('time', Date.now() - time);
            core.setFailed('Error in execution');
        }
    });
    child.on('error', (error) => {
        core.setOutput('time', Date.now() - time);
        core.setFailed(`Error in execution: ${error.message}`);
    });
} catch (error) {
    core.setOutput('time', Date.now() - time);
    core.setFailed(error.message);
}