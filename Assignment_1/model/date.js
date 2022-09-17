const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dateSchema = new Schema({
   date:{
      type: Date,
      default : () => Date.now()
   },
   workOnDay: {
      eachTime: [
         {
            beginWork: {
               type: Date,
               default: Date.now
            },
            endWork: {
               type: Date,
               default: Date.now
            }
         }
      ]
   },
   staffId: {
      type: Schema.Types.ObjectId,
      ref: 'Staff',
      require: true
   }
});

module.exports = mongoose.model("date" , dateSchema);
