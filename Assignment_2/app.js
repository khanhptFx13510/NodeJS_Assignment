const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const multer = require('multer');

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

// Using csrf to protecting hacks
// app.use(csrf());

// Link to come Store save file image
const fileStorage = multer.diskStorage({
  // create adress to come
  destination: (req, file, cb) => {
      cb(null, 'images');
  },
  filename: (req, file, cb) => { // create file img name
      cb(null, Date.now().toString() + '-' + file.originalname);
  },
});

// Filter Image to save
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ){
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(bodyParser.urlencoded({extended: false}));

app.use(
  multer({ storage: fileStorage , fileFilter: fileFilter}).single('image')
);

app.use(express.json());

app.use(
  session({ 
    secret: 'secret' , 
    resave: false, 
    saveUninitialized: false , 
    store: store 
  })
);


app.use((req ,res , next) => {
  if (!req.session.staff) {
    return next();
  }
  Staff.findById(req.session.staff._id)
    .then(staff => {
      req.staff = staff
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});

// truyen du lieu xac thuc cho tat ca cac page yeu cau 
app.use((req, res, next)=>{
  res.locals["isAuthenticated"] = req.session.isLoggedIn;
  if(req.session.manager){
    res.locals["isManager"] = req.session.manager;
  }else{
    res.locals["isManager"] = false;
  }
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
    app.listen(3001, () => {
      console.log(`Example app listening on port ${3001}`)
    })
  })
})
.catch(err => console.log("error: " + err));


