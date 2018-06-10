"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const passport_1 = require("passport");
const passport_2 = require("./middleware/passport");
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
app.use(express.static(path.join(__dirname, '../views/plant-app/dist')));
// app.use(express.static(path.resolve('../views/account')));
app.use(express.static(path.join(__dirname, 'public'), {
    maxAge: 31557600000
}));
app.get('/', function (req, res) {
    res.sendfile('../views/plant-app/dist/index.html');
});
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
    store: new MongoStore({
        mongooseConnection: mongoose_1.connection,
        url: 'mongodb://rsmith5901:321Eaglecourt$@ds016058.mlab.com:16058/mygreenvault',
        autoReconnect: true,
        clear_interval: 3600
    })
}));
mongoose_1.connect('mongodb://rsmith5901:321Eaglecourt$@ds016058.mlab.com:16058/mygreenvault');
mongoose_1.connection.on('error', (err) => {
    console.error(err);
    console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
    process.exit();
});
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');
app.use(expressStatusMonitor());
app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(expressValidator());
app.use(passport_1.initialize());
app.use(passport_1.session());
app.use(flash());
app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));
app.use((req, res, next) => {
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
app.get('/account', passport_2.isAuthenticated, userController.getAccount);
app.post('/account/profile', passport_2.isAuthenticated, userController.postUpdateProfile);
app.post('/account/password', passport_2.isAuthenticated, userController.postUpdatePassword);
app.post('/account/delete', passport_2.isAuthenticated, userController.postDeleteAccount);
app.get('/account/unlink/:provider', passport_2.isAuthenticated, userController.getOauthUnlink);
app.use('/api/v1/plants', passport_2.isAuthenticated, plantsRoutes);
app.use(errorHandler());
app.listen(app.get('port'), () => {
    console.log('session secrete', process.env.MONGODB_URI);
    console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), app.get('port'), app.get('env'));
    console.log('  Press CTRL-C to stop\n');
});
module.exports = app;
//# sourceMappingURL=app.js.map