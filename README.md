# jsnbt-backup-dropbox

> A backup utility for jsnbt installations with a dropbox target.

## Overview

This uses dropbox-backup internally, having the same functionality.
reference [dropbox-backup](https://www.npmjs.com/package/dropbox-backup)

## Install

Install with [npm](https://www.npmjs.com/)

```sh
$ npm install jsnbt-backup-dropbox --save-dev
```

### Usage

```js
var JsnbtBackup = require('jsnbt-backup-dropbox');

var backup = new JsnbtBackup({
    credentials: {
        key: "DROPBOXKEY",
        secret: "DROPBOXSECRET",
        token: "DROPBOXTOKEN"
    },
    files: [{
        name: 'files',
        path: './www/public/files'
    }],
    database: {
        name: 'dbname',
        host: 'localhost',
        port: 27017
    }
});

backup.run();
```


## license

    The MIT License (MIT)

    Copyright (c) 2016 akon

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in
    all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
    THE SOFTWARE.
