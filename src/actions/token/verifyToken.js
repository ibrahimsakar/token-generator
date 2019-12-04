const debug = require('debug')('app:actions:token:verifyToken');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const validateAuthorizationHeader = require('../../utils/validateAuthorizationHeader');

async function apiVerifyToken(config, token, postParams) {
    const publicKey = fs.readFileSync(config.jwt.public, 'utf8');

    try
    {
        const legit = await jwt.verify(token, publicKey, { algorithm: postParams.signAlgorithm });

        return { err: null, data: legit };
    }
    catch (e) {
        return { err: e, data: null };
    }
}

async function verifyToken(app, headers, postParams) {
    const config = app.get('config');
    const authorizationHeaderValue = headers.authorization;
    const validationResult = validateAuthorizationHeader(authorizationHeaderValue);
    const apiResult = await apiVerifyToken(config, validationResult, postParams);

    if (apiResult.err) {
        return apiResult;
    }

    return { err: null, data: apiResult };
}

module.exports = verifyToken;
