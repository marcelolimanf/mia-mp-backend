const mongoose = require('mongoose')
const { Schema } = mongoose;
const mongoosePaginate = require('mongoose-paginate-v2');

const nameSchema = new Schema({
  date:  String, 
  type:  String, 
  number:  String, 
  operation:  String,
  value:  Number,
  total:  Number,
});

nameSchema.plugin(mongoosePaginate);

const Data = mongoose.model('Data', nameSchema);


module.exports = Data