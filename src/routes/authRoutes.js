const express = require('express');
const passport = require('passport');
const authController = require('../controllers/authController');

const authRouter = express.Router();

function router(nav) {
  const {
    signUp,
    getSignIn,
    logout,
    getProfile,
    middleware
  } = authController(nav);
  authRouter.route('/signUp')
    .post(signUp);
  authRouter.route('/signin')
    .get(getSignIn)
    .post(passport.authenticate('local', {
      successRedirect: '/auth/profile',
      failureRedirect: '/'
    }));
  authRouter.route('/logout')
    .get(logout);
  authRouter.route('/profile')
    .all(middleware)
    .get(getProfile);

  return authRouter;
}

module.exports = router;
