const debug = require('debug')('app:actions:token:generateToken');
const fs = require('fs');
const jwt = require('jsonwebtoken');

async function apiGenerateToken(config, postParams) {
    const privateKey = fs.readFileSync(config.jwt.private, 'utf8');
    const payload = postParams.data;

    try
    {
        const token = await jwt.sign(payload, privateKey, { algorithm: postParams.signAlgorithm });

        return { err: null, data: token };
    }
    catch (e) {
        return { err: e, data: null };
    }
}

async function generateToken(app, headers, postParams) {
    const config = app.get('config');
    const apiResult = await apiGenerateToken(config, postParams);

    if (apiResult.err) {
        return apiResult;
    }

    return { err: null, data: apiResult };
}

module.exports = generateToken;
