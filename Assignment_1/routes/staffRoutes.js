const express = require('express');
const staffController = require('../controllers/staff');

const router = express.Router();

// homepage
router.get('/', staffController.getStaff);

router.post('/', staffController.postStaffWork);   

router.get('/profile', (req, res, next) => {
   res.send("<h1>views 2 profile stafff</h1>");
});

router.get('/salary' , (req, res, next) => {
   res.send("<h1>salary information</h1>")
});

router.get('/covid-19' , (req, res, next) => {
   res.send("<h1>Covid information</h1>")
});

module.exports = router;