const express = require('express')
const router = express.Router()
const catchAsync = require('../utils/catchAsync')
const passport = require('passport')
const User = require('../models/user')
const { storeReturnTo } = require('../middleware')
const users = require('../controllers/users')

router.route('/register')
    .get(users.renderRegister)
    .post(catchAsync(users.register))


router.route('/login')
    .get(users.renderLogin)
    .post( // use the storeReturnTo middleware to save the returnTo value from session to res.locals
    storeReturnTo,
    passport.authenticate('local', {failureFlash: true, failureRedirect: '/login'}), users.login,)

router.get('/logout', users.logout); 

module.exports = router