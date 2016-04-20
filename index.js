require('rootpath')();
var express = require('express');
var app = express();
var session = require('express-session');
var bodyParser = require('body-parser');
var expressJwt = require('express-jwt');
var config = require('config.json');


app.use(express.static(__dirname+'/public'));
//set up the logger function
// app.use(logger);

app.get('/html', function(req, res){
  res.sendFile('html/index.html', { root: __dirname + '/public' });
});
app.get('/about', function(req, res){
  res.sendFile('html/about.html', { root: __dirname + '/public' });
});
app.get('/contact', function(req, res){
  res.sendFile('html/contact.html', { root: __dirname + '/public' });
});
// app.get('/todolist', function(req, res){
//   res.sendFile('html/todolist.html', { root: __dirname + '/public' });
// });
// app.get('/login', function(req, res){
//   res.sendFile('html/login.html', { root: __dirname + '/public' });
// });
// app.get('/contact', function(req, res){
//   res.sendFile('html/contact.html', { root: __dirname + '/public' });
// });

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({ secret: config.secret, resave: false, saveUninitialized: true }));


app.use('/api', expressJwt({ secret: config.secret }).unless({ path: ['/api/users/authenticate', '/api/users/register'] }));

// routes
app.use('/login', require('./controllers/login.controller'));
app.use('/register', require('./controllers/register.controller'));
app.use('/app', require('./controllers/app.controller'));
app.use('/api/users', require('./controllers/api/users.controller'));

// make '/app' default route
app.get('/', function (req, res) {
    return res.redirect('/app');
});

// start server
var server = app.listen(3000, function () {
    console.log('Server listening at http://' + server.address().address + ':' + server.address().port);
});
