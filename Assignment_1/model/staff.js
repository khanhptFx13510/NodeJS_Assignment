const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const staffSchema = new Schema({
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
   annualLeave :{
      type: Number,
      require: true
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
         }
      }
   ]
});

staffSchema.methods.addWorkOnDay = function(staff){
   // post time to start work and end work into staff.wonkOnDay
   const workOnDay = [...this.workOnDay];
   // console.log("Staff.workOnDay: ", workOnDay);
   workOnDay.push({
      beginWork: Date(staff.workOnDay[staff.workOnDay.length].beginWork),
      endWork: Date(staff.workOnDay[staff.workOnDay.length].endWork)
   });
   this.workOnDay = workOnDay;
   
   // console.log("update workOnDay: ", this.workOnDay);
}

module.exports = mongoose.model('Staff' , staffSchema);