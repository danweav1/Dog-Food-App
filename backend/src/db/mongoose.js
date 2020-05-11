const mongoose = require('mongoose');
const connectionURL = 'mongodb://127.0.0.1:27017/dog-food-app-api';

mongoose.connect(connectionURL, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
