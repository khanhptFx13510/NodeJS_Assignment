const path = require('path');
const rootDir =require('path').dirname(process.mainModule.filename);
const Staff = require('../model/staff');
const DateOff = require('../model/date');
const Covid = require('../model/covid');

const { userInfo } = require('os');

exports.getStaff = (req, res, next) => {
   var isShowInfor;
   var statusWorking;

   Staff.findOne()
      .then((staff) => {
         if(statusWorking == undefined){
            if(staff.workOnDay[staff.workOnDay.length - 1].endWork === undefined){
               statusWorking = true;
               res.render('index', {
                  title: staff.name,
                  props : staff,
                  path: '/',
                  isShowInfor: isShowInfor ? isShowInfor : false,
                  statusWorking: statusWorking,
                  notifi: null,
               });
            } else {
               res.render('index', {
                  title: staff.name,
                  props : staff,
                  path: '/',
                  isShowInfor: isShowInfor ? isShowInfor : false,
                  statusWorking: false,
                  notifi: null,
               });
            }
         }else {
            res.render('index', {
               title: staff.name,
               props : staff,
               path: '/',
               isShowInfor: isShowInfor ? isShowInfor : false,
               statusWorking: statusWorking,
               notifi: null,
            });
         }

      })
   // res.sendFile(path.join(__dirname, '../views/index.html'));
}

exports.postStaffWork = (req, res, next) => {
   const startWork = req.body.startWork;
   const staffId = req.body.staffId;
   const endWork = req.body.endWork;
   const workPlace = req.body.workPlace;

   console.log(startWork);
   console.log(staffId , workPlace);
   console.log(endWork);

   Staff.findById(staffId)
      .then(staff => {
         if(startWork){
            staff.addWorkOnDay({
               startWork: new Date(),
               isNew: true,
               workPlace: workPlace
            });
            res.render('index', {
               title: staff.name,
               props : staff,
               path: '/',
               isShowInfor: true,
               statusWorking: true,
               notifi: null,
            });
         } 
         else if(endWork){
            staff.addWorkOnDay({
               endWork: new Date(),
               isNew: false
            });
            res.render('index', {
               title: staff.name,
               props : staff,
               path: '/',
               isShowInfor: true,
               statusWorking: false,
               notifi: null,
            });
         }
      })
      .catch(error => console.log(err))  
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

// View profile pape 2 Profile-------------------------------------------------------------------
exports.profile = (req, res, next) => {
   Staff.findById(req.staff._id)
      .then((staff) => {
         res.render('profile', {
            title: 'profile',
            props : staff,
            path: '/profile',
         });
      });     
}
   // Change Image Profile
exports.postImageProfile = function(req, res, next){
   const newImage = req.body.image;
   req.staff.changeImage(newImage);
   res.redirect('/profile');
}

// Controller page 3 salary---------------------------------------------------------------------
exports.getSalary = function(req, res, next){
   // create an object that stores data by month and day
   let monthInYear = { "1":{} ,"2":{} ,"3":{} ,"4":{} ,"5":{} ,"6":{} ,"7":{} ,"9":{} ,"10":{} ,"11":{} ,"12":{} };

   // sap xep ngay dang ki nghi theo thang
   let annualLeave = { "1":[] ,"2":[] ,"3":[] ,"4":[] ,"5":[] ,"6":[] ,"7":[] ,"9":[] ,"10":[] ,"11":[] ,"12":[] };

   // Merge Populate Annual Leave into Staff
   DateOff.findOne()
      .populate("staffId")
      .then((staff) => {
         // console.log(staff);
         const workOnDay = staff.staffId.workOnDay;
         // filter follow month in year
         for(e of workOnDay){
            let dayKey = new Date(e.beginWork).getDate();
            // January
            if(new Date(e.beginWork).getMonth() === 0){
               if(dayKey in monthInYear[1]){
                  monthInYear[1][dayKey].push(e);
               } else{
                  monthInYear[1][dayKey] = [e];
               }
            }
            // February
            if(new Date(e.beginWork).getMonth() === 1){

               if(dayKey in monthInYear[2]){
                  monthInYear[2][dayKey].push(e);
               } else{
                  monthInYear[2][dayKey] = [e];
               }
            }
            // March
            if(new Date(e.beginWork).getMonth() === 2){

               if(dayKey in monthInYear[3]){
                  monthInYear[3][dayKey].push(e);
               } else{
                  monthInYear[3][dayKey] = [e];
               }
            }
            // April
            if(new Date(e.beginWork).getMonth() === 3){

               if(dayKey in monthInYear[4]){
                  monthInYear[4][dayKey].push(e);
               } else{
                  monthInYear[4][dayKey] = [e];
               }
            }
            // May
            if(new Date(e.beginWork).getMonth() === 4){

               if(dayKey in monthInYear[5]){
                  monthInYear[5][dayKey].push(e);
               } else{
                  monthInYear[5][dayKey] = [e];
               }
            }
            // June
            if(new Date(e.beginWork).getMonth() === 5){

               if(dayKey in monthInYear[6]){
                  monthInYear[6][dayKey].push(e);
               } else{
                  monthInYear[6][dayKey] = [e];
               }
            }
            // July
            if(new Date(e.beginWork).getMonth() === 6){

               if(dayKey in monthInYear[7]){
                  monthInYear[7][dayKey].push(e);
               } else{
                  monthInYear[7][dayKey] = [e];
               }
            }
            // August
            if(new Date(e.beginWork).getMonth() === 7){

               if(dayKey in monthInYear[8]){
                  monthInYear[8][dayKey].push(e);
               } else{
                  monthInYear[8][dayKey] = [e];
               }
            }
            // September
            if(new Date(e.beginWork).getMonth() === 8){

               if(dayKey in monthInYear[9]){
                  monthInYear[9][dayKey].push(e);
               } else{
                  monthInYear[9][dayKey]= [e]
               }
            }
            // October
            if(new Date(e.beginWork).getMonth() === 9){

               if(dayKey in monthInYear[10]){
                  monthInYear[10][dayKey].push(e);
               } else{
                  monthInYear[10][dayKey] = [e];
               }
            }
            // November
            if(new Date(e.beginWork).getMonth() === 10){

               if(dayKey in monthInYear[11]){
                  monthInYear[11][dayKey].push(e);
               } else{
                  monthInYear[11][dayKey] = [e];
               }
            }
            // December
            if(new Date(e.beginWork).getMonth() === 11){

               if(dayKey in monthInYear[12]){
                  monthInYear[12][dayKey].push(e);
               } else{
                  monthInYear[12][dayKey] = [e];
               }
            }
         };

         // filter annualLeave follow month
         const dateOff = staff.dateOff;
         for(e of dateOff){
            let splitDay = e.days[0].split("/");
            annualLeave[splitDay[0]].push(e);            
         }
         
         res.render('salary', {
            title: 'salary',
            props: staff.staffId,
            path: '/salary',
            data: monthInYear,
            annualLeave: annualLeave     
         });
      });
}

// Controller page 4 information Covid-19
exports.getInfoCovid = function(req, res, next){
   Covid.findOne(req.staff._id)
      .then(result => {
         if(!result){
            const staff = new Covid({
               staffId: req.staff._id
            });
            staff.save();

            res.render('covid', {
               title : "Covid-19",
               path: '/covid-19',
               data: staff,
               error: null,
               name: req.staff.name            
            });

         }else{
            let name= req.staff.name
            res.render('covid', {
               title : 'covid-19',
               path: '/covid-19',
               data: result,
               error: null,
               name: name
            });
         }
      })

}

exports.postInfoCovid = function(req, res, next){
   const temperature = req.body.temperature;
   const dateOfTemperature = req.body.dateOfTemperature;

   // mui 1
   const firstVaccineName= req.body.firstVaccineName;
   const dateOfFirstInject = req.body.dateOfFirstInject;
   // mui 2
   const secondVaccineName= req.body.secondVaccineName;
   const dateOfSecondInject = req.body.dateOfSecondInject;
   // covid Status
   const covidStatus = req.body.covidStatus;
   const dateCovidStatus = req.body.dateCovidStatus;

   // check conditional
   if(
      (temperature !== "" && !isNaN(temperature) && dateOfTemperature !== "") ||
      (firstVaccineName !== "Choose..." && dateOfFirstInject !== "") ||
      (secondVaccineName !== "Choose..." && dateOfSecondInject !== "") ||
      (covidStatus !== "Choose..." && dateCovidStatus !== "")
   ){
      Covid.findOne(req.staff._id)
         .then(covid => {
            if(temperature !== "" && !isNaN(temperature) && dateOfTemperature !== ""){
               covid["hypothermia"] = {
                  temperature: temperature,
                  time: dateOfTemperature
               }
            };
   
            if(firstVaccineName !== "Choose..." && dateOfFirstInject !== ""){
               covid["firstInject"] = {
                  typeVaccine: firstVaccineName,
                  time: dateOfFirstInject
               }
            };
   
            if(secondVaccineName !== "Choose..." && dateOfSecondInject !== ""){
               covid["secondInject"] = {
                  typeVaccine: secondVaccineName,
                  time: dateOfSecondInject
               }
            };
   
            if(covidStatus !== "Choose..." && dateCovidStatus !== ""){
               covid["isCovid"]= {
                  positive: covidStatus,
                  time: dateCovidStatus
               }
            };
            let data = covid
            res.render('covid' , {
               path: '/covid-19',
               props: {name: "covid information"},
               error: null,
               data: data,
               name: req.staff.name             
            })
            covid.save();
         })
   } else{
      Covid.findOne(req.staff._id)
         .then(covid => {
            let data = covid;
            console.log("data" , data);
            res.render('covid' , {
               path: '/covid-19',
               props: {name: "covid information"},
               error: "not enought information to save",
               data: data,
               name: req.staff.name              
            })

         })
   }

}

