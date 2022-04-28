'use strict';

const { existsSync } = require('fs');
const { join } = require('path');
const { spawn } = require('child_process');
const { getInput, setOutput, setFailed } = require('@actions/core');
const github = require('@actions/github');

const time = Date.now();
try {
    const script = getInput('script');
    const args = (getInput('args') || '').split(' ');
    const scriptFile = join(process.cwd(), script);

    if (!script || !existsSync(scriptFile)) {
        throw new Error(`The script does not exist: ${scriptFile}`);
    }

    console.log(`Executing the script: ${scriptFile}`);
    const child = spawn('node', [
        scriptFile, ...args,
    ], {
        cwd: process.cwd(),
        stdio: [0, 1, 2, 'ipc'],
        env: Object.assign({}, process.env),
    });

    child.on('exit', (code) => {
        if (code !== 0) {
            setOutput('time', Date.now() - time);
            setFailed('Error in execution');
        }
    });
    child.on('error', (error) => {
        setOutput('time', Date.now() - time);
        setFailed(`Error in execution: ${error.message}`);
    });
} catch (error) {
    setOutput('time', Date.now() - time);
    setFailed(error.message);
}