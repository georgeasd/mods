var run = require('./theme').run,
    PrettyError = require('pretty-error'),
    pe = new PrettyError();

run().then(function(){
  console.log('Done')
})
.catch(function(error){
  var renderedError = pe.render(error)
  console.log(renderedError)
});