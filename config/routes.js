const axios = require('axios');
const db = require('../database/dbConfig');
const { authenticate, checkPassword } = require('../auth/authenticate');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = server => {
    server.post('/api/register', register);
    server.post('/api/login', login);
    server.get('/api/jokes', authenticate, getJokes);
};

function register(req, res) {
    const userInfo = req.body;
    const hash = bcrypt.hashSync(userInfo.password, 12);
    userInfo.password = hash;

    db('users')
        .insert(userInfo)
        .then(ids => {
            res.status(201).json(ids);
        })
        .catch(err => res.status(500).json(err));
}

function login(req, res) {
    const creds = req.body;

    db('users')
        .where({ username: creds.username })
        .first()
        .then(user => {
            let token = '';
            try {
                token = checkPassword(user, creds);
                res.status(200).json({
                    message: 'Successfully logged in.',
                    token,
                });
            } catch (err) {
                res.status(401).json({
                    message: 'Username or password are incorrect.',
                });
            }
        });
}

function getJokes(req, res) {
    const requestOptions = {
        headers: { accept: 'application/json' },
    };

    axios
        .get('https://icanhazdadjoke.com/search', requestOptions)
        .then(response => {
            res.status(200).json(response.data.results);
        })
        .catch(err => {
            res.status(500).json({
                message: 'Error Fetching Jokes',
                error: err,
            });
        });
}
