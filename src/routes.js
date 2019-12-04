const debug = require('debug')('app:router');
const indexAction = require('./actions/index');
const apiGenerateToken = require('./actions/token/generateToken');
const apiVerifyToken = require('./actions/token/verifyToken');

function fixErrorObjectResult(err) {
    const serialized = JSON.stringify(err, Object.getOwnPropertyNames(err));

    return JSON.parse(serialized);
}

const routes = (router, app) => {
    // --------------------
    // -- ROOT
    // --------------------

    // GET /
    router.get('/', (req, res, next) => {
        const result = indexAction(app);

        res.status(200)
           .json(result);
    });

    // --------------------
    // -- TOKEN
    // --------------------

    // POST /token/generateToken
    router.post('/token/generateToken', async (req, res, next) => {
        const result = await apiGenerateToken(app, req.headers, req.body);

        if (result.err) {
            res.status(500)
                .json(fixErrorObjectResult(result.err));

            return;
        }

        res.status(200)
            .json(result.data);
    });

    // POST /token/verifyToken
    router.post('/token/verifyToken', async (req, res, next) => {
        const result = await apiVerifyToken(app, req.headers, req.body);

        if (result.err) {
            res.status(500)
                .json(fixErrorObjectResult(result.err));

            return;
        }

        res.status(200)
            .json(result.data);
    });
}

module.exports = routes;
