var ora = require('ora'),
    run = require('./theme').run;

var spinner = ora('building for production...')
spinner.start()

run(function (err, stats) {
  spinner.stop()
  if (err) throw err
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n')
})