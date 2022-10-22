const express = require('express');
const staffController = require('../controllers/staff');

const router = express.Router();

// homepage
router.get('/', staffController.getStaff);

router.post('/', staffController.postStaffWork);   
router.post('/annualLeave', staffController.postAnnualLeave);

// page 2 Profile
router.get('/profile', staffController.profile);
router.post('/profile', staffController.postImageProfile);

// page 3 salary
router.get('/salary' , staffController.getSalary);

// page 4 Covid-19
router.get('/covid-19' , staffController.getInfoCovid);
router.post('/covid-19', staffController.postInfoCovid);

module.exports = router;