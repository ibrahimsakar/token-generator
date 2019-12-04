const debug = require('debug')('app:configLoader');
const fs = require('fs');

function configLoader(env) {
    debug('loading config file');

    const config = require('../etc/config');

    debug('trying to find environmental config file');

    const envConfigName = `config.${env}`;

    try {
        fs.accessSync(`${__dirname}/../etc/${envConfigName}.js`, fs.constants.R_OK);

        debug(`${envConfigName} is accessible, loading`);

        Object.assign(config, require(`../etc/${envConfigName}`));
    }
    catch (ex) {
        debug(`${envConfigName} is not found, skipping`);
    }

    return config;
}

module.exports = configLoader;
