const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const mongoConnect = () =>{
   MongoClient.connect('mongodb+srv://khanhpham:khanhdu123@khanhpham.6zl1ibi.mongodb.net/assignment_1?retryWrites=true&w=majority')
      .then(client => {
         console.log('conneted!');
      })
      .catch(err => {
         console.log(err);
         throw err;
      })
}

mongoConnect();
// mongodb+srv://khanhpham:khanhdu123@khanhpham.6zl1ibi.mongodb.net/?retryWrites=true&w=majority
// mongodb+srv://khanhpham:khanhdu123@khanhpham.6zl1ibi.mongodb.net/shop?retryWrites=true&w=majority