const express = require('express');
const staffController = require('../controllers/staff');
const isAuth = require('../middleware/is-auth');
const isManager = require('../middleware/is-manager');
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
router.get('/covid-19/:covidId' , isAuth, staffController.getPdf);

router.post('/covid-19', isAuth, staffController.postInfoCovid);

// page 5 Conform salary
router.get('/conform', isAuth, isManager, staffController.getConform);
router.get('/conform/:staffId', isAuth , isManager, staffController.showDetailConform);

// http://localhost:3001/conform/635cbdfd7091a7ab9ca66042
// http://localhost:3001/conform/color.css

module.exports = router;