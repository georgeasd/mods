var ora = require('ora'),
    run = require('./theme').run,
    PrettyError = require('pretty-error'),
    pe = new PrettyError();

var spinner = ora({
  text: 'building for production...',
  spinner: 'bouncingBar'
})
spinner.start()

run().then(function(){
  spinner.succeed()
})
.catch(function(error){
  spinner.fail()
  var renderedError = pe.render(error)
  console.log(renderedError)
});