function parseAuthorizationHeader(headerValue) {
    if (headerValue === undefined) {
        return null;
    }

    const headerValueParts = headerValue.split(' ');

    if (headerValueParts.length < 2 || headerValueParts[0].toLowerCase() !== 'bearer' || headerValueParts[1].length < 1) {
        return null;
    }

    return headerValueParts[1];
}

function validateAuthorizationHeader(headerValue) {
    // let's see if the format is correct
    const accessToken = parseAuthorizationHeader(headerValue);

    if (accessToken === null) {
        return [ false, 400, {
            code: 'ERR_AUTHENTICATION_TOKEN_IS_MISSING_OR_INVALID',
            message: 'Authentication token is missing or invalid',
        } ];
    }

    return accessToken;
}

module.exports = validateAuthorizationHeader;
