const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const staffSchema = new Schema({
   email:{
      type: String,
      required: true
   },
   password:{
      type: String,
      required: true
   },
   role:{
      type: String,
      required: true
   },
   name:{
      type: String,
      require: true
   },
   dOB: {
      type: Date,
      require: true
   },
   salaryScale:{
      type: Number,
      require: true
   },
   image: {
      type: String,
      require: true
   },
   annualLeave: {
      remainingDays: Number,
      dateOff: [
         {
            days: [],
            time: Number,
            reason: String
         }
      ]
   },
   department :{
      type: String,
      require: true
   },
   startDate: {
      type: Date,
      require: true
   },
   workOnDay: [
      {
         beginWork: {
            type: Date,
         },
         endWork: {
            type: Date,
         },
         workPlace: {
            type: String
         },
         isConfirm: Boolean
      }
   ],
   manager: Schema.Types.Mixed
});

staffSchema.methods.addWorkOnDay = function(item){

   // post time to start work and end work into staff.wonkOnDay
   const workOnDay = [...this.workOnDay];
   if(item.isNew){
      workOnDay.push({
         beginWork: item.startWork,
         workPlace: item.workPlace
      });

      this.workOnDay = workOnDay;
      this.save();
   } else {
      workOnDay[workOnDay.length-1].endWork = item.endWork;
      this.save();
   }
};

staffSchema.methods.addDateOffId = function(dateOff){
   // thoi gian nghi con lai va thong tin xin nghi
   const remainingDays =dateOff.remainingDays
   const listAnual = dateOff.dateOff

   // luu data
   this.annualLeave["dateOff"][this.annualLeave.dateOff.length] = listAnual;
   this.annualLeave.remainingDays = remainingDays;
   this.save();
   
};

// ------------------Page 2 Profile methods
staffSchema.methods.changeImage = function(newImg){
   this.image = newImg;
   this.save();
};

module.exports = mongoose.model('Staff' , staffSchema);