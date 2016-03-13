var fs = require('fs-extra');
var path = require('path');
var spawn = require('child_process').spawn;
var server = require('server-root');
var jsonValidation = require('json-validation');
var DropboxBackup = require('dropbox-backup');
var log4js = require('log4js');
var extend = require('extend');
var _ = require('underscore');

var optionsSchema = {
    type: 'object',
    required: true,
    properties: {
        credentials: {
            type: 'object',
            required: true,
            properties: {
                key: {
                    type: 'string',
                    required: true
                },
                secret: {
                    type: 'string',
                    required: true
                },
                token: {
                    type: 'string',
                    required: true
                }
            }
        },
        files: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    name: {
                        type: 'string',
                        required: true
                    },
                    path: {
                        type: 'string',
                        required: true
                    }
                },
                required: true
            },
            required: true
        },
        database: {
            type: 'object',
            required: true,
            properties: {
                name: {
                    type: 'string',
                    required: true
                },
                host: {
                    type: 'string',
                    required: true
                },
                port: {
                    type: 'number',
                    required: true
                }
            }
        }
    }
};

var FolderProcessor = function () { };
FolderProcessor.prototype.process = function (ctx, next) {
    fs.emptyDir('./temp/' + ctx.name, function (err) {
        if (err) {
            ctx.error(err);
        }
        else {
            next();
        }
    });
};

var DatabaseBackupProcessor = function () { };
DatabaseBackupProcessor.prototype.process = function (ctx, next) {
    ctx.log('dumping database...');

    var args = ['--host', ctx.options.database.host, '--port', ctx.options.database.port.toString(), '--db', ctx.options.database.name, '--out', server.mapPath('temp/' + ctx.name + '/db')];
    var mongodump = spawn('mongodump', args);

    mongodump.on('exit', function (code) {
        if (code === 0) {
            next();
        }
        else {
            ctx.error(new Error('database backup failed'));
        }
    });
};

var FilesBackupProcessor = function () { };
FilesBackupProcessor.prototype.process = function (ctx, next) {
    ctx.log('copying up files...');

    fs.ensureDir('./temp/' + ctx.name + '/files', function (err) {
        if (err) {
            ctx.error(ctx, err);
        }
        else {
            _.each(ctx.options.files, function (filesEntry) {
                fs.copySync(filesEntry.path, './temp/' + ctx.name + '/files/' + filesEntry.name);
            });

            next();
        }
    });

};

var DropboxProcessor = function (name) {
    this.name = name;
};
DropboxProcessor.prototype.process = function (ctx, next) {
    var backup = new DropboxBackup(ctx.options.credentials);

    var fn = function (x) {

        x.archive.directory('./temp/' + ctx.name + '/db', 'db');
        x.archive.directory('./temp/' + ctx.name + '/files', 'files');

        x.upload(function (err) {
            if (err)
                ctx.error(err);
            else
                next();
        });
    };

    if (this.name)
        backup.run(this.name, fn);
    else
        backup.run(fn);
};

var ResetProcessor = function () { };
ResetProcessor.prototype.process = function (ctx, next) {
    fs.remove('./temp/' + ctx.name, function (err) {
        if (err) {
            ctx.error(ctx, err);
        }
        else {
            next();
        }
    });
};

var JsnbtBackup = function (options) {
    var jv = new jsonValidation.JSONValidation();
    var validationResults = jv.validate(options, optionsSchema);

    if (!validationResults.ok)
        throw new Error(validationResults.errors.join(", ") + " at path " + validationResults.path);

    this.options = options;

    this.name = 'bak';
};

JsnbtBackup.prototype.run = function (name) {
    var self = this;

    var nameInternal = typeof (name) === 'string' ? name : undefined;

    var logger = log4js.getLogger('dropbox-backup');

    var ctx = {};
    ctx.name = self.name;
    ctx.options = self.options;

    ctx.log = function(message) {
        logger.info(message);
    };
    ctx.error = function (ex) {
        if (typeof (ctx.cb) === 'function')
            ctx.cb(ex);
        else {
            var resetProcessor = new ResetProcessor();
            resetProcessor.process(ctx, function () {
                logger.error(ex);
            });
        }
    };

    var processors = [];
    processors.push(new FolderProcessor());
    processors.push(new DatabaseBackupProcessor());
    processors.push(new FilesBackupProcessor());
    processors.push(new DropboxProcessor(nameInternal));
    processors.push(new ResetProcessor());
    processors.push({
        process: function (ctx) {
            ctx.log('backup completed');
        }
    });
    var nextIndex = 0;
    var next = function () {
        nextIndex++;
        var processor = processors[nextIndex];
        processor.process(ctx, next);
    };

    var first = _.first(processors);
    first.process(ctx, next);
};

module.exports = JsnbtBackup;