const mongoose = require('mongoose');
const connectionURL = 'mongodb://127.0.0.1:27017/dog-food-app-api';

mongoose
  .connect(connectionURL, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to database!');
  })
  .catch(() => {
    console.log('Connection failed!');
  });
