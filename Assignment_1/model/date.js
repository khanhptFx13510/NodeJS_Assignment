const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dateSchema = new Schema({
   staffId: {
      type: Schema.Types.ObjectId,
      ref: 'Staff',
      require: true
   },
   dateOff: [
      {
         days: [],
         time: Number,
         reason: String
      }
   ]
});

dateSchema.methods.addDaysOff = function(valueUpdates) {
   const daysOff = this.dateOff
   // check anyone time break annual Leave
   if(daysOff[daysOff.length - 1].days.length === 0){
      daysOff[daysOff.length - 1] = {
         days: valueUpdates.daysArray, 
         time: valueUpdates.timeAnnual, 
         reason: valueUpdates.reason
      }
      // this.save();
   }else{
      daysOff[daysOff.length] = {
         days: valueUpdates.daysArray, 
         time: valueUpdates.timeAnnual, 
         reason: valueUpdates.reason
      }
      // this.save();
   }
}

module.exports = mongoose.model("dateOff" , dateSchema);
