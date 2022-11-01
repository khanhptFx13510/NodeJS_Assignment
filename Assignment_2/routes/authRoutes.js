const express = require('express');
const authController = require('../controllers/auth');

const router = express.Router();
const isAuth = require('../middleware/is-auth');

// login
router.get('/login', authController.getLogin);

router.post('/login', authController.postLogin);

router.post('/logout', authController.postLogout);

module.exports = router;