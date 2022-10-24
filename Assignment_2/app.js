const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

// views engine
app.set('view engine' , 'ejs')
app.set('views', 'views');

// import Router
const staffRoutes = require('./routes/staffRoutes');

// import controller
const errorController = require('./controllers/error');

// import Model
const Staff = require('./model/staff');
const Timer = require('./model/date');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));

app.use((req ,res , next) => {
  Staff.findById('631e91b269ba3974a72651c9')
    .then((staff) => {
      req.staff = staff
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});

app.use(staffRoutes);
app.use(errorController.get404);

mongoose.connect('mongodb+srv://khanhpham:khanhdu123@khanhpham.6zl1ibi.mongodb.net/assignment_1?retryWrites=true&w=majority')
.then(result => {
  Staff.findOne().then((staff) => {
    if(!staff){
      const staff = new Staff({
        name: 'Messi',
        dOB: new Date("1992-9-16"),
        salaryScale: 1.5,
        image: "https://vnn-imgs-f.vgcloud.vn/2020/08/23/11/dien-vien-anh-thu-tiet-lo-nguyen-nhan-ly-hon-chong-cu.jpg",
        annualLeave: 3,
        department: "Sale",
        startDate: new Date("2022-9-12")
      });
      staff.save()
    }
    app.listen(3001, () => {
      console.log(`Example app listening on port ${3001}`)
    })
  })
  // console.log(Staff.findOne()._collection.collectionName);
})
.catch(err => console.log("error: " + err));


