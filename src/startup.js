const debug = require('debug')('app:startup');

// load .env file
debug('loading .env file');

require('dotenv').config();

// init express
debug('initializing express');

const express = require('express');

const app = express();
const env = (app.get('env') || '').toLowerCase();

// load config file
const configLoader = require('./configLoader');

const config = configLoader(env);

app.set('config', config);

// express options
const envType = config.envType || 'development';
const isDevelopment = (envType === 'development');

if (isDevelopment) {
    app.set('json spaces', 4);
}
app.set('x-powered-by', false);

// init express middlewares
debug('initializing express middlewares');

const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// init express router
debug('initializing express routes');

const routes = require('./routes');

const routerModule = require('express').Router; // express.Router

const router = routerModule();

routes(router, app);

// enable routing definitons
debug('enabling routing definitons');

app.use('/', router);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');

    err.status = 404;

    next(err);
});

// error handler
app.use((err, req, res, next) => {
    const response = {
        message: err.message,
    };

    if (isDevelopment) {
        response.error = err;
    }

    // render the error page
    res.status(err.status || 500);
    res.json(response);
});

debug('app initialization is done');

module.exports = app;
