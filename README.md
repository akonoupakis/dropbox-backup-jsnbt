# jsnbt-backup-dropbox
> a backup utility for jsnbt installations with a dropbox target

![VERSION](https://img.shields.io/npm/v/jsnbt-backup-dropbox.svg)
![DOWNLOADS](https://img.shields.io/npm/dt/jsnbt-backup-dropbox.svg)
[![ISSUES](https://img.shields.io/github/issues-raw/akonoupakis/jsnbt-backup-dropbox.svg)](https://github.com/akonoupakis/jsnbt-backup-dropbox/issues)
![LICENCE](https://img.shields.io/npm/l/jsnbt-backup-dropbox.svg)

[![NPM](https://nodei.co/npm/jsnbt-backup-dropbox.png?downloads=true)](https://nodei.co/npm/jsnbt-backup-dropbox/)

## overview

This uses dropbox-backup internally, having the same functionality;
reference [dropbox-backup](https://www.npmjs.com/package/dropbox-backup)

## usage

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

// upload the backup to the daily/weekly/monthly folders
backup.run();
// or upload a single backup as test.zip 
backup.run('test');
```


## license
```
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
```