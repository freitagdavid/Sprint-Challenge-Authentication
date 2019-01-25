const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const jwtKey =
    process.env.JWT_SECRET ||
    'add a .env file to root of project with the JWT_SECRET variable';

// quickly see what this file exports
module.exports = {
    authenticate,
    checkPassword,
};

// implementation details
function authenticate(req, res, next) {
    const token = req.get('Authorization');

    if (token) {
        jwt.verify(token, jwtKey, (err, decoded) => {
            if (err) return res.status(401).json(err);

            req.decoded = decoded;

            next();
        });
    } else {
        return res.status(401).json({
            error: 'No token provided, must be set on the Authorization Header',
        });
    }
}

function checkPassword(user, creds) {
    if (user && bcrypt.compareSync(creds.password, user.password)) {
        return generateToken(user);
    } else {
        throw 'Login unsuccessful.';
    }
}

function generateToken(user) {
    const payload = {
        username: user.username,
        name: user.name,
    };
    const options = {
        expiresIn: '60m',
    };

    return jwt.sign(payload, jwtKey, options);
}
