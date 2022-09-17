const path = require('path');
const rootDir =require('path').dirname(process.mainModule.filename);
const Staff = require('../model/staff');

exports.getStaff = (req, res, next) => {
   const staff = Staff.findById('631e91b269ba3974a72651c9')
      .then((staff) => {
         staff.dOB = new Date("1992-9-16");
         staff.startDate = new Date("2022-9-12");
         staff.save();
         res.render('index', {
            props : staff,
            pageTitle: staff.name,
            path: '/'
         });
      })
   // res.sendFile(path.join(__dirname, '../views/index.html'));
}

exports.postStaffWork = (req, res, next) => {
   const startWork = req.body.startWork;
   const staffId = req.body.staffId;
   const endWork = req.body.endWork;
   console.log("startWork", startWork);
   console.log("staffId: ", staffId);
   console.log("endWork: ", endWork);

   if(startWork){
      Staff.findById(staffId)
         .then(staff => {
            staff.workOnDay.push({
               beginWork: new Date()
            })
            console.log(staff.workOnDay);
            console.log(staff.workOnDay.length);
         })
         .then(result => {
            res.redirect('/');
         })
   }else if(endWork){
      Staff.findById(staffId)
         .then(staff => {
            console.log("endWork: ",endWork);
            staff.workOnDay.push({
               endWork: new Date()
            })
            console.log(staff.workOnDay);
            console.log(staff.workOnDay[0].endWork);
         })
         .then(result => {
            res.redirect('/');
         })
   }
   // Staff.findById(staffId)
   //    .then(staff =>{
   //       return req.staff.addWorkOnDay(staff);
   //    })
   //    .then(result => {
   //       console.log(result);
   //       res.redirect('/');
   //    })
}
