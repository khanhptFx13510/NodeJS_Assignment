const path = require('path');
const rootDir =require('path').dirname(process.mainModule.filename);
const Staff = require('../model/staff');
const DateOff = require('../model/date');
const { userInfo } = require('os');

exports.getStaff = (req, res, next) => {
   const isShowInfor = req.query.isShowInfor
   const statusWorking = req.query.statusWorking

   Staff.findById('631e91b269ba3974a72651c9')
      .then((staff) => {
         // staff.annualLeave = {
         //    remainingDays: 4
         // };
         // staff.save();
         res.render('index', {
            props : staff,
            workPlace: staff.workPlace,
            path: '/',
            isShowInfor: isShowInfor ? isShowInfor : false,
            statusWorking: statusWorking ? statusWorking : false 
         });
      })
   // res.sendFile(path.join(__dirname, '../views/index.html'));
}

exports.postStaffWork = (req, res, next) => {
   const startWork = req.body.startWork;
   const staffId = req.body.staffId;
   const endWork = req.body.endWork;
   const workPlace = req.body.workPlace;

   console.log(req.body)
   console.log("startWork: ",startWork);
   console.log("endWork: ",endWork);
   
   Staff.findById(staffId)
      .then(staff => {
         console.log(staff.workOnDay);
         if(startWork){
            staff.addWorkOnDay({
               startWork: new Date(),
               isNew: true,
               workPlace: workPlace
            });
         } 
         else if(endWork){
            staff.addWorkOnDay({
               endWork: new Date(),
               isNew: false
            });
         }
      })
      .then(result => {
         if(startWork){
            res.redirect('/?isShowInfor=true&statusWorking=true');
         } else if(endWork){
            res.redirect('/?isShowInfor=true&statusWorking=false');
         }
      })  
};

exports.postAnnualLeave = (req, res, next) => {
   const annualLeave = req.body.datePicker;
   const staffId = req.body.staffId;
   const reason = req.body.reason;
   const timeAnnual = req.body.timeAnnual;

   console.log(annualLeave);
   // convert input datePicker multiple days to array
   const daysArray = annualLeave.split(",");
   
   DateOff.findOne({"staffId" : staffId})
      .then(data => {
         // if staffId can't find any in collection DateOff will create a new one
         if(!data){
            const item = new DateOff({
               staffId: staffId,
               dateOff: [
                  {days: [], time: timeAnnual, reason: reason}
               ]
            })
            item.save();
            req.staff.addDateOffId(item);
         }else{
            data.addDaysOff({ daysArray , timeAnnual , reason});
            // req.staff.addDateOffId();            
            // req.staff.save();
         }
      })
      .catch(err => {console.log(err)});
   res.redirect("/");
}