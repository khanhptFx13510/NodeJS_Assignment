const express = require('express');
const staffController = require('../controllers/staff');
const isAuth = require('../middleware/is-auth');
const router = express.Router();

// homepage
router.get('/', isAuth, staffController.getStaff);

router.post('/', isAuth, staffController.postStaffWork);   
router.post('/annualLeave', isAuth, staffController.postAnnualLeave);

// page 2 Profile
router.get('/profile', isAuth, staffController.profile);
router.post('/profile', isAuth, staffController.postImageProfile);

// page 3 salary
router.get('/salary' , isAuth, staffController.getSalary);

// page 4 Covid-19
router.get('/covid-19' , isAuth, staffController.getInfoCovid);
router.post('/covid-19', isAuth, staffController.postInfoCovid);

module.exports = router;