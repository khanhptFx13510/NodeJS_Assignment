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
         // staff.annualLeave.remainingDays = 4;
         // staff.save();
         res.render('index', {
            props : staff,
            path: '/',
            isShowInfor: isShowInfor ? isShowInfor : false,
            statusWorking: statusWorking ? statusWorking : false,
            notifi: null
         });
      })
   // res.sendFile(path.join(__dirname, '../views/index.html'));
}

exports.postStaffWork = (req, res, next) => {
   const startWork = req.body.startWork;
   const staffId = req.body.staffId;
   const endWork = req.body.endWork;
   const workPlace = req.body.workPlace;
   
   Staff.findById(staffId)
      .then(staff => {
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
   // check status working or not Working
   const statusWorking = req.body.status;

   // Information update annualLeave
   const annualLeave = req.body.datePicker;
   const staffId = req.body.staffId;
   const reason = req.body.reason;
   const timeAnnual = req.body.timeAnnual;
   
   // convert input datePicker multiple days to array
   const daysArray = annualLeave.split(",");
   const staffRemainingDays = req.staff.annualLeave.remainingDays;
   const totalDayOff = (daysArray.length * timeAnnual) / 8;

   if(staffRemainingDays >= totalDayOff){
      DateOff.findOne({"staffId" : staffId})
         .then(data => {
            // if staffId can't find any in collection DateOff will create a new one
            if(!data){
               const item = new DateOff({
                  staffId: staffId,
                  dateOff: [
                     {days: daysArray, time: timeAnnual, reason: reason}
                  ]
               })
               item.save();
               req.staff.addDateOffId(item);
               
            }else{
               data.addDaysOff({daysArray , timeAnnual , reason});
               req.staff.addDateOffId(staffRemainingDays - totalDayOff);

            }
         })
         .then(result => {
            res.redirect(`/?statusWorking=${statusWorking}`);
         })
         .catch(err => {console.log(err)});
   }
   else if(staffRemainingDays === 0) {
      res.render('index',{
         props : req.staff,
         notifi : "Bạn đã hết ngày nghỉ phép",
         path: `/?statusWorking=${statusWorking}`,
      })
   } 
   else if(staffRemainingDays < totalDayOff){
      res.render('index',{
         props : req.staff,
         notifi : "Thời gian xin nghĩ vượt quá giới hạn thời gian được phép nghỉ",
         path: `/?statusWorking=${statusWorking}`,
      })
   } 
}

// View profile pape 2 Profile
exports.profile = (req, res, next) => {
   Staff.findById('631e91b269ba3974a72651c9')
      .then((staff) => {
         res.render('profile', {
            props : staff,
            path: '/profile',            
         });
      });     
}

exports.postImageProfile = function(req, res, next){
   const newImage = req.body.image;
   req.staff.changeImage(newImage);
   res.redirect('/profile')
}

