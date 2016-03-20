# dropbox-backup-jsnbt
> a backup-dropbox processor for jsnbt installations

![VERSION](https://img.shields.io/npm/v/dropbox-backup-jsnbt.svg)
![DOWNLOADS](https://img.shields.io/npm/dt/dropbox-backup-jsnbt.svg)
[![ISSUES](https://img.shields.io/github/issues-raw/akonoupakis/dropbox-backup-jsnbt.svg)](https://github.com/akonoupakis/dropbox-backup-jsnbt/issues)
![LICENCE](https://img.shields.io/npm/l/dropbox-backup-jsnbt.svg)

[![BUILD](https://api.travis-ci.org/akonoupakis/dropbox-backup-jsnbt.svg?branch=master)](http://travis-ci.org/akonoupakis/dropbox-backup-jsnbt)
![STANDARDJS](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)
[![DEPENDENCIES](https://david-dm.org/akonoupakis/dropbox-backup-jsnbt.svg)](https://david-dm.org/akonoupakis/dropbox-backup-jsnbt)

[![NPM](https://nodei.co/npm/dropbox-backup-jsnbt.png?downloads=true)](https://nodei.co/npm/dropbox-backup-jsnbt/)

## overview

This module comes as a plugin to the dropbox-backup, to backup the database and the files of jsnbt installations

## usage

```js
var DropboxBackup = require('dropbox-backup')
var JsnbtBackupProcessor = require('dropbox-backup-jsnbt')

var backup = new DropboxBackup({
    key: "DROPBOXKEY",
    secret: "DROPBOXSECRET",
    token: "DROPBOXTOKEN"
})

backup.use(new JsnbtBackupProcessor({
    files: [{
        name: 'files',
        path: './www/public/files'
    }],
    database: {
        name: 'dbname',
        host: 'localhost',
        port: 27017
    }
}))

// upload the backup to the daily/weekly/monthly folders
backup.run(function (x) {
  x.upload(function (err, res){
    if (err) {
      throw err
    }
  })
})

// or upload a single backup as test.zip 
backup.run('test', function (x) {
  x.upload(function (err, res){
    if (err) {
      throw err
    }
  })
})
```

## copyright and license

Code and documentation copyright 2016 akon. Code released under [the MIT license](https://cdn.rawgit.com/akonoupakis/dropbox-backup-jsnbt/master/LICENSE).