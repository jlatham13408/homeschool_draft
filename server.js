var express = require('express'),
    logger  = require('morgan')('dev'),
    server  = express();

server.use(express.static(__dirname+'/public'));
//set up the logger function
server.use(logger);

server.get('/', function(req, res){
  res.sendFile('html/index.html', { root: __dirname + '/public' });
});
server.get('/about', function(req, res){
  res.sendFile('html/about.html', { root: __dirname + '/public' });
});
server.get('/login', function(req, res){
  res.sendFile('html/login.html', { root: __dirname + '/public' });
});
server.get('/contact', function(req, res){
  res.sendFile('html/contact.html', { root: __dirname + '/public' });
});
server.listen(8080, function(){
  console.log('Now listening on port ' + 8080);
});
