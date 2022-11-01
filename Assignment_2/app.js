const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const MONGODB_URI = 'mongodb+srv://khanhpham:khanhdu123@khanhpham.6zl1ibi.mongodb.net/assignment_2';

const app = express();

const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions',
});

// views engine
app.set('view engine' , 'ejs');
app.set('views', 'views');

// import Router
const staffRoutes = require('./routes/staffRoutes');
const authRoutes = require('./routes/authRoutes');

// import controller
const errorController = require('./controllers/error');

// import Model
const Staff = require('./model/staff');
const Timer = require('./model/date');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));

app.use(
  session({ 
    secret: 'secret' , 
    resave: false, 
    saveUninitialized: false , 
    store: store 
  })
);

// Using csrf to protecting hacks
// app.use(csrf());

app.use((req ,res , next) => {
  Staff.findOne()
    .then(staff => {
      req.staff = staff
      next();
    })
    .catch((err) => {
      console.log(err);
    });
  // Staff.findById('631e91b269ba3974a72651c9')
  //   .then((staff) => {
  //     req.staff = staff
  //     next();
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
});

// truyen du lieu xac thuc cho tat ca cac page yeu cau 
app.use((req, res, next)=>{
  res.locals["isAuthenticated"] = req.session.isLoggedIn;
  
  next();
});

app.use(staffRoutes);
app.use(authRoutes);
app.use(errorController.get404);

mongoose.connect(
  // 'mongodb+srv://khanhpham:khanhdu123@khanhpham.6zl1ibi.mongodb.net/assignment_2?retryWrites=true&w=majority'
  MONGODB_URI
)
.then(result => {
  Staff.findOne().then((staff) => {
    // if(!staff){
    //   const staff = new Staff({
    //     name: 'Messi',
    //     dOB: new Date("1992-9-16"),
    //     salaryScale: 1.5,
    //     image: "https://vnn-imgs-f.vgcloud.vn/2020/08/23/11/dien-vien-anh-thu-tiet-lo-nguyen-nhan-ly-hon-chong-cu.jpg",
    //     annualLeave: 3,
    //     department: "Sale",
    //     startDate: new Date("2022-9-12")
    //   });
    //   staff.save()
    // }
    app.listen(3001, () => {
      console.log(`Example app listening on port ${3001}`)
    })
  })
})
.catch(err => console.log("error: " + err));


