var bcrypt = require('bcryptjs');
const Staff = require('../model/staff')

exports.getLogin = (req, res, next) => {
   // console.log("cookies: ",req.get('Cookie'));
   // const isLoggedIn = req.get('Cookie').trim().split('=')[1] === 'true';
   res.render('login' , {
      title: 'login',   
      path: '/login',
   })
}

exports.postLogin = (req, res, next) => {
   const email = req.body.email;
   const password = req.body.password;

   console.log(email, password);   
   Staff.findOne({email: email})
      .then((staff) => {
         // console.log(staff.password === password);
         if(!staff){
            return res.redirect("/login");
         } else {
            if(staff.password === password){
               req.session.isLoggedIn = true;
               req.session.staff = staff;

               if(!staff.manager){
                  req.session.manager = true;
                  req.session.save(err => {
                     console.log(err);
                  });
                  return res.redirect('/');
               }else{
                  req.session.save(err => {
                     console.log(err);
                  });
                  return res.redirect('/');
               }
            }else{
               res.redirect('/login');
            }
         }
      })
};

exports.postLogout = (req, res, next) => {
   req.session.destroy((err) => {
       console.log(err);
       res.redirect('/');
   });
};