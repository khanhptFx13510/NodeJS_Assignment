const path = require('path');
const rootDir =require('path').dirname(process.mainModule.filename);
const Staff = require('../model/staff');

exports.getStaff = (req, res, next) => {
   const status = req.query.statusWorking
   console.log("status dong 7: " , status);

   Staff.findById('631e91b269ba3974a72651c9')
      .then((staff) => {
         res.render('index', {
            props : staff,
            workPlace: staff.workPlace,
            path: '/',
            statusWorking: status ? status : false
         });
      })
   // res.sendFile(path.join(__dirname, '../views/index.html'));
}

exports.postStaffWork = (req, res, next) => {
   const startWork = req.body.startWork;
   const staffId = req.body.staffId;
   const endWork = req.body.endWork;
   const workPlace = req.body.workPlace;
   const status = req.query.statusWorking
   console.log("status" , status);

   Staff.findById(staffId)
      .then(staff => {
         if(startWork){
            staff.addWorkOnDay({
               startWork: startWork,
               isNew: true,
               workPlace: workPlace,
            })
         } 
         else if(endWork){
            staff.addWorkOnDay({
               endWork: endWork,
               isNew: false
            })
         }
      })
      .then(result => {
         res.redirect('/?statusWorking=true');
      })
}
