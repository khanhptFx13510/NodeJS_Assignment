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
   ],
   covidId: {
      type: Schema.Types.ObjectId,
      ref: 'Covid',
      require: true
   }
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
   if(isNaN(dateOff) === false){
      this.annualLeave = {...this.annualLeave , remainingDays: dateOff};
      this.save();

   }else{
      const timeOff = dateOff.dateOff[dateOff.dateOff.length - 1].time;
      const daysOff = dateOff.dateOff[dateOff.dateOff.length - 1].days.length;
      // tong so thời gian nghi doi ra ngay
      const totalDayOff = (daysOff * timeOff) / 8
   
      const remainingDays =this.annualLeave.remainingDays - totalDayOff;

      this.annualLeave = {daysOffId: dateOff._id , remainingDays: remainingDays};
      this.save();
   }
};

// ------------------Page 2 Profile methods
staffSchema.methods.changeImage = function(newImg){
   this.image = newImg;
   this.save();
}
module.exports = mongoose.model('Staff' , staffSchema);