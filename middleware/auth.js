const config = require('config');
const jwt = require('jsonwebtoken');

function auth(req, res, next){
    const token = req.header('x-auth-token');

    if(!token) 
        return res.status(401).json({msg:'No token authorizaton denied.'});

    try {
        const decode = jwt.verify(token, config.get('jwtSecret'));
        req.user = decode;
        next();    
    } catch (error) {
        res.status(401).json({msg:'No token authorizaton denied.'});
    }
}

module.exports = auth;