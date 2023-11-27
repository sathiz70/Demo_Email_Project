'use strict';

const router = require('express-promise-router')();

// controllers
const authController = require('../../controllers/app/authController');


// user
router.post('/register', authController.userRegistration);
router.post('/send/email', authController.sendEmail);
router.get('/email/list', authController.emailList);


module.exports = router;
