const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const covidSchema = new Schema({
   staffId: {
      type: Schema.Types.ObjectId,
      ref: 'Staff',
      require: true
   },
   hypothermia:{
      temperature: String,
      time: String
   },
   injectVacine:[
      {
         numberInject: String,
         typeVaccine: String,
         time: String
      }
   ],
   isCovid: {
      positive: String,
      time: String
   },
   name: String
});

covidSchema.methods.addInforCovid = function(item){
   console.log(item);
   console.log(this);
   
   // this.save();
};

module.exports = mongoose.model("Covid" , covidSchema);