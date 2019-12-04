const debug = require('debug')('app:actions:index');

function index(app) {
    const config = app.get('config');

    return {
        title: 'Index Test',
        message: `${config.app.name} v${config.app.version} ${config.envType} ${process.env.NODE_ENV}`,
        endpoints: [
            'GET /',
            'POST /token/generateToken',
            'POST /token/verifyToken',
        ],
    };
}

module.exports = index;
