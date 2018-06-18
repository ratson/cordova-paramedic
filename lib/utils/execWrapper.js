/**
    Licensed to the Apache Software Foundation (ASF) under one
    or more contributor license agreements.  See the NOTICE file
    distributed with this work for additional information
    regarding copyright ownership.  The ASF licenses this file
    to you under the Apache License, Version 2.0 (the
    "License"); you may not use this file except in compliance
    with the License.  You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing,
    software distributed under the License is distributed on an
    "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, either express or implied.  See the License for the
    specific language governing permissions and limitations
    under the License.
*/
'use strict';

var execa = require('execa');
var verbose;

function exec(cmd, onFinish, onData) {
    const opts = {stdout: verbose ? 'inherit' : 'ignore'};
    if (onFinish instanceof Function || onFinish === null) {
        var cp = execa.shell(cmd, opts).then(onFinish);

        if (onData instanceof Function) {
            cp.on('data', onData);
        }
    } else {
        return execa.shellSync(cmd, opts);
    }
}

function execPromise(cmd) {
    return execa.shell(cmd);
}

exec.setVerboseLevel = function (_verbose) {
    verbose = _verbose;
};

module.exports.exec = exec;
module.exports.execPromise = execPromise;
