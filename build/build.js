var path = require('path')
var ora = require('ora')
var h = require('./helper')
var config = require('./config')

var spinner = ora('building for production...')
spinner.start()
