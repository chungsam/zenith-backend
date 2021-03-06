var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var config = require('./config');

var index = require('./routes/index');
var activityTypesRoutes = require('./routes/activities');
var eventsRoutes = require('./routes/events');

// api models
var activityTypesApiRoutes = require('./routes/api/activityTypes');
var eventsApiRoutes = require('./routes/api/events');


var app = express();

// mongoose setup
var mongoose = require('mongoose');
mongoose.connect(config.databaseMLab);
var db = mongoose.connection;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'zenith-client/dist')));

app.use('/admin', index);

// api routes
app.use('/api/activityTypes', activityTypesApiRoutes);
app.use('/api/events', eventsApiRoutes);

// admin routes
app.use('/admin/activityTypes', activityTypesRoutes);
app.use('/admin/events', eventsRoutes);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'zenith-client/dist/index.html'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
