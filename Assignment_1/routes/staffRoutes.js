const express = require('express');
const staffController = require('../controllers/staff');

const router = express.Router();

// homepage
router.get('/', staffController.getStaff);

router.post('/', staffController.postStaffWork);   
router.post('/annualLeave', staffController.postAnnualLeave);

// page 2 Profile
router.get('/profile', (req, res, next) => {
   res.send("<h1>views 2 profile stafff</h1>");
});

// page 3 salary
router.get('/salary' , (req, res, next) => {
   res.send("<h1>salary information</h1>")
});

router.get('/covid-19' , (req, res, next) => {
   res.send("<h1>Covid information</h1>")
});

module.exports = router;