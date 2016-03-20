var fs = require('fs-extra')
var spawn = require('child_process').spawn
var server = require('server-root')
var jsonValidation = require('json-validation')
var schema = require('./schema.json')
var _ = require('underscore')

var JsnbtBackupProcessor = function (options) {
  var jv = new jsonValidation.JSONValidation()
  var validationResults = jv.validate(options, schema)

  if (!validationResults.ok) {
    throw new Error(validationResults.errors.join(', ') + ' at path ' + validationResults.path)
  }

  this.options = options
}

JsnbtBackupProcessor.prototype.process = function (context, archive, cb) {
  var self = this

  context.log('dumping database...')

  var args = ['--host', this.options.database.host, '--port', this.options.database.port.toString(), '--db', this.options.database.name, '--out', server.mapPath('temp/' + context.name + '/db')]
  var mongodump = spawn('mongodump', args)

  mongodump.on('exit', function (code) {
    if (code === 0) {
      archive.directory('./temp/' + context.name + '/db', 'db')

      context.log('copying up files...')

      fs.ensureDir('./temp/' + context.name + '/files', function (err) {
        if (err) {
          context.error(err)
        } else {
          _.each(self.options.files, function (filesEntry) {
            fs.copySync(filesEntry.path, './temp/' + context.name + '/files/' + filesEntry.name)
          })

          archive.directory('./temp/' + context.name + '/files', 'files')
          cb()
        }
      })
    } else {
      context.error(new Error('database backup failed'))
    }
  })
}

module.exports = JsnbtBackupProcessor
