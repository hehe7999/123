/**
 * Module dependencies.
 */

var path = require('path');
var express = require('express');
var routes = require('./routes');
var config = require('./config').config;

var app = module.exports = express.createServer();

// Configuration
app.configure(function() {

  var viewsRoot = path.join(__dirname, 'views');

  app.set('views', viewsRoot);
  app.set('view engine', 'html');
  app.register('.html', require('ejs'));
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.session({
    secret : config.session_secret
  }));
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(require('./controllers/account').auth_user);
  app.use(express.csrf());
});

var static_dir = path.join(__dirname, 'public');

app.configure('development', function() {
  app.use(express.static(static_dir));
  app.use(express.errorHandler({ dumpExceptions : true, showStack : true }));
});
app.configure('development_m', function() {
  app.use(express.static(static_dir));
  app.use(express.errorHandler({ dumpExceptions : true, showStack : true }));
  config.port = 5000;
});

app.configure('production', function() {
  var maxAge = 3600000 * 24 * 30;
  app.use(express.static(static_dir, { maxAge : maxAge }));
  app.use(express.errorHandler());
  app.set('view cache', true);
});

app.helpers({
  config : config
});

app.dynamicHelpers({
  csrf : function(req, res) {
    return req.session ? req.session._csrf : '';
  },
});

// routes
routes(app);

app.listen(config.port, function() {
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
