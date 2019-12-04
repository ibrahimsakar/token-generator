const app = require('./startup.js');
const debug = require('debug')('app:server');

/**
 * Normalize a port into a number, string or null.
 */
function normalizePort(val) {
    if (val === undefined || val.length === 0) {
        return null;
    }

    const portNumber = parseInt(val, 10);

    if (isNaN(portNumber)) {
        // named pipe
        return [ 'pipe', val ];
    }

    if (portNumber >= 0) {
        // port number
        return [ 'port', portNumber ];
    }

    return null;
}

function constructBindInfo(portAddress, defaultPortNumber) {
    const newBindInfo = {};

    // port info
    const portInfo = normalizePort(portAddress);

    if (portInfo !== null) {
        newBindInfo.portType = portInfo[0];
        newBindInfo.port = portInfo[1];
    }
    else {
        newBindInfo.portType = 'port';
        newBindInfo.port = defaultPortNumber;
    }

    return newBindInfo;
}

/**
 * Get port from environment and store in Express.
 */
const bindInfo = constructBindInfo(process.env.PORT, 3000);

app.set('port', bindInfo.port);

/**
 * Create HTTP server.
 */
const http = require('http');

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(bindInfo.port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    // handle specific listen errors with friendly messages
    switch (error.code) {
    case 'EACCES':
        console.error(`${bindInfo.portType} ${bindInfo.port} requires elevated privileges`);
        process.exit(1);
        break;

    case 'EADDRINUSE':
        console.error(`${bindInfo.portType} ${bindInfo.port} is already in use`);
        process.exit(1);
        break;

    default:
        throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
    const addr = server.address();
    const bind = (typeof addr === 'string') ?
        `pipe ${addr}` :
        `port ${addr.port}`;

    debug(`Listening on ${bind}`);
}
