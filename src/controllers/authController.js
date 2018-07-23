const { MongoClient, ObjectID } = require('mongodb');
const passport = require('passport');
const debug = require('debug')('app:authController');

function authController(nav) {
    function signUp(req, res) {
        const { username, password } = req.body;
        const url = 'mongodb://localhost:27017';
        const dbName = 'libraryApp';

        (async function addUser() {
            let client;
            try {
                client = await MongoClient.connect(url);
                debug('Connected correctly to server');

                const db = client.db(dbName);

                const col = db.collection('users');
                const user = { username, password };
                const results = await col.insertOne(user);
                req.login(results.ops[0], () => {
                    res.redirect('/auth/profile');
                });
            } catch (err) {
                debug(err);
            }
        }());
    }
    function getSignIn(req, res) {
        res.render('signin', {
            nav,
            title: 'Sign In'
        });
    }
    function logout(req, res) {
        req.logout();
        res.redirect('/auth/signin');
    }
    function getProfile(req, res) {
        res.json(req.user);
    }
    function middleware(req, res, next) {
        debug('Processing middleware');
        if (req.user) {
            next();
        } else {
            res.redirect('/');
        }
    }

    return {
        signUp,
        getSignIn,
        logout,
        getProfile,
        middleware
    }
}

module.exports = authController;