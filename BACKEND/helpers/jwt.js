const expressJwt = require('express-jwt');

function authJwt() {
    const secret = process.env.secret;
    const api = process.env.API_URL;
    return expressJwt({
        secret,
        algorithms: ['HS256'],
        isRevoked: isRevoked
    }).unless({
        path: [
            {url: /\/public\/uploads(.*)/, methods: ['GET', 'OPTIONS'] },
            {url: /\/api\/v1\/products(.*)/, methods: ['GET', 'OPTIONS'] },
            {url: /\/api\/v1\/categories(.*)/, methods: ['GET', 'OPTIONS'] },
            {url: /\/api\/v1\/messages(.*)/, methods: ['POST', 'OPTIONS'] },
            '/api/v1/messages',
            '/api/v1/users/login',
            '/api/v1/users/register'
            // Ne pas exclure /api/v1/orders pour qu'il nécessite une authentification
        ]
    })
}

async function isRevoked(req, payload, done) {
    //if (!payload.isAdmin) {
        done(); //donne(null, true); // <-- ceci bloque tout le monde !
    //}
    done();
}

module.exports = authJwt;