const express = require('express');
const authController = require('../controllers/auth');

const router = express.Router();

// login
router.get('/login', authController.getLogin);
// router.post('/login', authController.postLogin);

module.exports = router;