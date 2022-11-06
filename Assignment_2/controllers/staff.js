const path = require('path');
const fs = require('fs');
const Staff = require('../model/staff');
const DateOff = require('../model/date');
const Covid = require('../model/covid');
const PDFDocument = require('pdfkit');

const { userInfo } = require('os');

exports.getStaff = (req, res, next) => {
   var isShowInfor;
   var statusWorking;
   Staff.findById(req.staff._id)
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

   Staff.findById(req.staff._id)
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
   const staffId = req.staff._id;
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
   const newImage = req.file;
   if(!newImage){
      res.redirect('/profile');
   }  
   req.staff.changeImage(newImage.path);
   res.redirect('/profile');
}

// Controller page 3 salary---------------------------------------------------------------------
exports.getSalary = function(req, res, next){
   // create an object that stores data by month and day
   let monthInYear = { "1":{} ,"2":{} ,"3":{} ,"4":{} ,"5":{} ,"6":{} ,"7":{} ,"9":{} ,"10":{} ,"11":{} ,"12":{} };

   // sap xep ngay dang ki nghi theo thang
   let annualLeave = { "1":[] ,"2":[] ,"3":[] ,"4":[] ,"5":[] ,"6":[] ,"7":[] ,"9":[] ,"10":[] ,"11":[] ,"12":[] };

   // Merge Populate Annual Leave into Staff
   DateOff.findOne({staffId : req.staff._id})
      .populate("staffId")
      .then((staff) => {
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
         // find information manager
         var nameManager = "";
         console.log(req.staff._id);
         console.log(staff.staffId.manager);
         if(req.staff.manager){
            Staff.findById(staff.staffId.manager)
               .then(element => {
                  nameManager = element.name;
                  res.render('salary', {
                     title: 'salary',
                     props: staff.staffId,
                     path: '/salary',
                     data: monthInYear,
                     annualLeave: annualLeave,
                     nameManager: nameManager,
                  });
               })         
         }else{
            res.render('salary', {
               title: 'salary',
               props: staff.staffId,
               path: '/salary',
               data: monthInYear,
               annualLeave: annualLeave,
               nameManager: null,
            });
         }
      })
};

// Controller page 4 information Covid-19
exports.getInfoCovid = function(req, res, next){ 
   // is manager 
   if(!req.staff._doc.manager){
      Covid.find()
         .then(results => {
            let data = results.find((e) => 
               e._doc.staffId.toString() == req.staff._doc._id.toString()
            );
            let list = results.filter((e) => {
               return e._doc.staffId.toString() != req.staff._doc._id.toString()
            });

            if(!data){
               let item = new Covid({
                  staffId: req.staff._doc._id,
                  name: req.staff.name
               });
               item.save();
               res.render('covid', {
                  title : "Covid-19",
                  path: '/covid-19',
                  data: data,
                  error: null,
                  name: req.staff.name,
                  isManager: true,
                  staffRelate: list    
               });
            }else{
               res.render('covid', {
                  title : "Covid-19",
                  path: '/covid-19',
                  data: data,
                  error: null,
                  name: req.staff.name,
                  isManager: true,
                  staffRelate: list
               });
            }            
         })
         .catch((err) => {
            console.log("error: ", err);
         })
   }else{
      // not manager
      Covid.findOne({staffId: req.staff._id})
         .then(result => {
            if(!result){
               const item = new Covid({
                  staffId: req.staff._id,
                  name: req.staff.name
               });
               item.save();
               res.render('covid', {
                  title : "Covid-19",
                  path: '/covid-19',
                  data: item,
                  error: null,
                  name: req.staff.name,
                  isManager: false,
                  staffRelate: []   
               });
            }else{
               res.render('covid', {
                  title : 'covid-19',
                  path: '/covid-19',
                  data: result,
                  error: null,
                  name: req.staff.name,
                  isManager: false,
                  staffRelate: []
               });               
            }
         })
   }
};

// -----------post covid-------------
exports.postInfoCovid = function(req, res, next){
   const temperature = req.body.temperature;
   const dateOfTemperature = req.body.dateOfTemperature;

   // information injection
   const vaccineName = req.body.vaccineName;
   const dateOfInject = req.body.dateOfInject;
   const numberInjection = req.body.numberInjection;

   // covid Status
   const covidStatus = req.body.covidStatus;
   const dateCovidStatus = req.body.dateCovidStatus;

   // check conditional
   if(
      (temperature !== "" && !isNaN(temperature) && dateOfTemperature !== "") ||
      (vaccineName !== "Choose..." && dateOfInject !== "" && numberInjection !== "") ||
      (covidStatus !== "Choose..." && dateCovidStatus !== "")
   ){
      Covid.findOne({staffId: req.staff._id})
         .then(covid => {
            if(temperature !== "" && !isNaN(temperature) && dateOfTemperature !== ""){
               covid["hypothermia"] = {
                  temperature: temperature,
                  time: dateOfTemperature
               }
            };  
            if(vaccineName !== "Choose..." && dateOfInject !== "" && numberInjection !== ""){
               covid.injectVacine = [...covid.injectVacine, {
                  numberInject: numberInjection,
                  typeVaccine: vaccineName,
                  time: dateOfInject
               }]
            };   
            if(covidStatus !== "Choose..." && dateCovidStatus !== ""){
               covid["isCovid"]= {
                  positive: covidStatus,
                  time: dateCovidStatus
               }
            };
            covid.save();
            let data = covid;
            
            if(req.staff.manager){
               res.render('covid' , {
                  path: '/covid-19',
                  title: "covid information",
                  error: null,
                  data: data,
                  name: req.staff.name,
                  isManager: null             
               })           
            }else{
               res.redirect('/covid-19')
            }
         })   
   } else{
      res.redirect('/covid-19');
   }
};

// ---------Print file PDF----
exports.getPdf = function(req, res, next){
   const covidId = req.params.covidId;
   Covid.findById(covidId)
      .then((order) => {
         const invoiceName = 'invoice-' + covidId + '.pdf';
         const invoicePath = path.join('data', invoiceName);

         const pdfDoc = new PDFDocument();
         res.setHeader('Content-Type', 'application/pdf');
         res.setHeader(
               'Content-Disposition',
               'inline; filename="' + invoiceName + '"'
         );
         pdfDoc.pipe(fs.createWriteStream(invoicePath));
         pdfDoc.pipe(res);

         pdfDoc.fontSize(26).text('Covid-19 Information', {
            underline: true,
        });
         pdfDoc.text('---------------------');

         pdfDoc.fontSize(14).text('Name staff: ' + order.name );
         pdfDoc.fontSize(14).text(
            `Last declared hypothermia: ${order.hypothermia.temperature} degrees C
Last date declared hypothermia: ${order.hypothermia.time}`
         );
         order.injectVacine.map(element => {
            return pdfDoc.fontSize(14).text(`Vaccine inject ${element.numberInject} : ${element.typeVaccine}
Date of injection : ${element.time}`)
         })
         pdfDoc.fontSize(14).text(`History of infection with covid-19: ${order.isCovid.positive}`)
         pdfDoc.fontSize(14).text(`Time infection:: ${order.isCovid.time}`)

         pdfDoc.text('---------------------');
         pdfDoc.end();
      })
      .catch((err) => next(err));
};

// -------------------------------------- page 5------------------------------------------------
exports.getConform = function(req, res, next){
   Staff.find()
      .then(staffs => {
         manyStaff = staffs.filter(staff => {
            return staff.manager === req.staff._id.toString();
         });

         res.render('conform',{
            title: "conform",
            path: '/conform',
            staffs : manyStaff
         })         
      })
};

// forcus staff con form
exports.showDetailConform = function(req, res, next){
   const staffId = req.params.staffId;
   // create an object that stores data by month and day
   let monthInYear = { "1":{} ,"2":{} ,"3":{} ,"4":{} ,"5":{} ,"6":{} ,"7":{} ,"9":{} ,"10":{} ,"11":{} ,"12":{} };

   // sap xep ngay dang ki nghi theo thang
   let annualLeave = { "1":[] ,"2":[] ,"3":[] ,"4":[] ,"5":[] ,"6":[] ,"7":[] ,"9":[] ,"10":[] ,"11":[] ,"12":[] };

   DateOff.findOne({staffId: staffId})
      .then(data => console.log(data))
      // .populate("staffId")
      // .then((staff) => {
      //    const workOnDay = staff.staffId.workOnDay;
      //    // filter follow month in year
      //    for(e of workOnDay){
      //       let dayKey = new Date(e.beginWork).getDate();
      //       // January
      //       if(new Date(e.beginWork).getMonth() === 0){
      //          if(dayKey in monthInYear[1]){
      //             monthInYear[1][dayKey].push(e);
      //          } else{
      //             monthInYear[1][dayKey] = [e];
      //          }
      //       }
      //       // February
      //       if(new Date(e.beginWork).getMonth() === 1){

      //          if(dayKey in monthInYear[2]){
      //             monthInYear[2][dayKey].push(e);
      //          } else{
      //             monthInYear[2][dayKey] = [e];
      //          }
      //       }
      //       // March
      //       if(new Date(e.beginWork).getMonth() === 2){

      //          if(dayKey in monthInYear[3]){
      //             monthInYear[3][dayKey].push(e);
      //          } else{
      //             monthInYear[3][dayKey] = [e];
      //          }
      //       }
      //       // April
      //       if(new Date(e.beginWork).getMonth() === 3){

      //          if(dayKey in monthInYear[4]){
      //             monthInYear[4][dayKey].push(e);
      //          } else{
      //             monthInYear[4][dayKey] = [e];
      //          }
      //       }
      //       // May
      //       if(new Date(e.beginWork).getMonth() === 4){

      //          if(dayKey in monthInYear[5]){
      //             monthInYear[5][dayKey].push(e);
      //          } else{
      //             monthInYear[5][dayKey] = [e];
      //          }
      //       }
      //       // June
      //       if(new Date(e.beginWork).getMonth() === 5){

      //          if(dayKey in monthInYear[6]){
      //             monthInYear[6][dayKey].push(e);
      //          } else{
      //             monthInYear[6][dayKey] = [e];
      //          }
      //       }
      //       // July
      //       if(new Date(e.beginWork).getMonth() === 6){

      //          if(dayKey in monthInYear[7]){
      //             monthInYear[7][dayKey].push(e);
      //          } else{
      //             monthInYear[7][dayKey] = [e];
      //          }
      //       }
      //       // August
      //       if(new Date(e.beginWork).getMonth() === 7){

      //          if(dayKey in monthInYear[8]){
      //             monthInYear[8][dayKey].push(e);
      //          } else{
      //             monthInYear[8][dayKey] = [e];
      //          }
      //       }
      //       // September
      //       if(new Date(e.beginWork).getMonth() === 8){

      //          if(dayKey in monthInYear[9]){
      //             monthInYear[9][dayKey].push(e);
      //          } else{
      //             monthInYear[9][dayKey]= [e]
      //          }
      //       }
      //       // October
      //       if(new Date(e.beginWork).getMonth() === 9){

      //          if(dayKey in monthInYear[10]){
      //             monthInYear[10][dayKey].push(e);
      //          } else{
      //             monthInYear[10][dayKey] = [e];
      //          }
      //       }
      //       // November
      //       if(new Date(e.beginWork).getMonth() === 10){

      //          if(dayKey in monthInYear[11]){
      //             monthInYear[11][dayKey].push(e);
      //          } else{
      //             monthInYear[11][dayKey] = [e];
      //          }
      //       }
      //       // December
      //       if(new Date(e.beginWork).getMonth() === 11){

      //          if(dayKey in monthInYear[12]){
      //             monthInYear[12][dayKey].push(e);
      //          } else{
      //             monthInYear[12][dayKey] = [e];
      //          }
      //       }
      //    };

      //    // filter annualLeave follow month
      //    const dateOff = staff.dateOff;
      //    for(e of dateOff){
      //       let splitDay = e.days[0].split("/");
      //       annualLeave[splitDay[0]].push(e);            
      //    }
      // })

   res.render('detailConform', {
      title: 'Staff Detail',
      path: '/conform/' + staffId,
   })
}
