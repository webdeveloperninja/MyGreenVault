import { connect, connection } from 'mongoose';
import { initialize, session as passportSession } from 'passport';

import { isAuthenticated } from './middleware/passport';

const session = require('express-session');
const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const logger = require('morgan');
const chalk = require('chalk');
const errorHandler = require('errorhandler');
const lusca = require('lusca');
const path = require('path');
const dotenv = require('dotenv').config({ path: path.join(__dirname, '../src/.env') });
const MongoStore = require('connect-mongo')(session);
const flash = require('express-flash');
const ejs = require('ejs');
const expressValidator = require('express-validator');
const expressStatusMonitor = require('express-status-monitor');
const sass = require('node-sass-middleware');
const multer = require('multer');
var cons = require('consolidate');

const userController = require('./controllers/user');

const app = express();

const plantsRoutes = require('./routes/plant')();

app.use(express.static(path.resolve('../static-pages')));

app.use(
  express.static(path.join(__dirname, 'public'), {
    maxAge: 31557600000
  })
);

app.use(express.static(path.join(__dirname, '../../angular-plant-app/dist')));
app.get('/', function(req: any, res: any) {
  res.sendfile('../../angular-plant-app/dist/index.html');
});

app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
    store: new MongoStore({
      mongooseConnection: connection,
      url: 'mongodb://rsmith5901:321Eaglecourt!@ds035747.mlab.com:35747/my-green-vault',
      autoReconnect: true,
      clear_interval: 3600
    })
  })
);

connect('mongodb://rsmith5901:321Eaglecourt!@ds035747.mlab.com:35747/my-green-vault');
connection.on('error', (err: any) => {
  console.error(err);
  console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
  process.exit();
});

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, '../../static-pages'));
app.set('view engine', 'ejs');
app.use(expressStatusMonitor());
app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json({ limit: '3.5mb', extended: true }));
app.use(
  bodyParser.urlencoded({
    limit: '3.5mb',
    extended: true
  })
);
app.use(expressValidator());

app.use(initialize());
app.use(passportSession());
app.use(flash());

app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));
app.use((req: any, res: any, next: any) => {
  res.locals.user = req.user;
  next();
});

app.get('/login', userController.getLogin);
app.post('/login', userController.postLogin);
app.get('/logout', userController.logout);
app.get('/forgot', userController.getForgot);
app.post('/forgot', userController.postForgot);
app.get('/reset/:token', userController.getReset);
app.post('/reset/:token', userController.postReset);
app.get('/signup', userController.getSignup);
app.post('/signup', userController.postSignup);

app.get('/account', isAuthenticated, userController.getAccount);
app.post('/account/profile', isAuthenticated, userController.postUpdateProfile);
app.post('/account/password', isAuthenticated, userController.postUpdatePassword);
app.post('/account/delete', isAuthenticated, userController.postDeleteAccount);
app.get('/account/unlink/:provider', isAuthenticated, userController.getOauthUnlink);

app.use('/api/v1/plants', isAuthenticated, plantsRoutes);

app.use(errorHandler());

app.listen(app.get('port'), () => {
  console.log('session secrete', process.env.MONGODB_URI);
  console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), app.get('port'), app.get('env'));

  console.log('  Press CTRL-C to stop\n');
});

module.exports = app;
