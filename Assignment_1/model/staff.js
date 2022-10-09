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
   annualLeave: {
      remainingDays: Number,
      daysOffId: {
         type: Schema.Types.ObjectId,
         ref: 'dateOff',
         require: true
      }
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
         }
      }
   ]
});

staffSchema.methods.addWorkOnDay = function(item){
   // console.log(
   //    "parse to take hh:mm:ss",
   //    new Date(this.workOnDay[0].endWork).toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1")
   // );
   // post time to start work and end work into staff.wonkOnDay
   const workOnDay = [...this.workOnDay];
   if(item.isNew){
      workOnDay.push({
         beginWork: item.startWork,
         workPlace: item.workPlace
      });

      this.workOnDay = workOnDay;
      // this.save();
      // console.log(this.workOnDay);
   } else {
      workOnDay[workOnDay.length-1].endWork = item.endWork;
      // this.save();
   }
};

staffSchema.methods.addDateOffId = function(dateOff){
   if(!isNaN(dateOff)){
      console.log(dateOff);
   }else{
      console.log("Not Number")
   }
   this.annualLeave = {...this.annualLeave , daysOffId: dateOff._id};
   // this.save();
};

module.exports = mongoose.model('Staff' , staffSchema);