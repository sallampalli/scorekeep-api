/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , players = require('./routes/players')
  , http = require('http')
  , path = require('path')
  , mysql = require('mysql');

var app = express();

app.configure(function () {
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));

});

var connection = mysql.createConnection({
  host: 'appsdb.cnpyedxsumgn.us-east-2.rds.amazonaws.com',
  port: 3306,
  user: 'appuser',
  password: 'appuserpass',
  database: 'appsdb'
});

connection.connect();

app.get('/players', function(req, res){
  connection.query('SELECT * from PLAYER', function (err, results, fields) {
    var response = JSON.stringify({response: results});
    return res.send(response);
  });
})

app.configure('development', function () {
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function () {
  console.log("Express server listening on port " + app.get('port'));
});
