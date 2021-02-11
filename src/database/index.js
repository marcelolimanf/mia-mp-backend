const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://evandropc:evandro1993.com@cluster0.ewlrv.mongodb.net/Cluster0?retryWrites=true&w=majority', {
  useNewUrlParser: true, 
  useUnifiedTopology: true
});

module.exports = mongoose