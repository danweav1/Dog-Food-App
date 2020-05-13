const express = require('express');
const debug = require('debug')('node-angular');
require('./db/mongoose'); // don't want to grab anythig, we just want to make sure the file runs and connects to the database
const userRouter = require('./routers/user');
const petRouter = require('./routers/pet');
const foodRouter = require('./routers/food');

const app = express();

const normalizePort = (val) => {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
};
const port = normalizePort(process.env.PORT || 3000);

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  next();
});
app.use(express.json()); // will automatically parse incoming json to an object so we can access it in our request handlers
app.use(userRouter);
app.use(petRouter);
app.use(foodRouter);

app.listen(port, () => {
  console.log('Listening on port ' + port);
});
