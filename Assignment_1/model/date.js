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
   daysOff[daysOff.length] = {
      days: valueUpdates.daysArray, 
      time: valueUpdates.timeAnnual, 
      reason: valueUpdates.reason
   }
   this.save();
}

module.exports = mongoose.model("dateOff" , dateSchema);
