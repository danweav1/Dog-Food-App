const express = require('express');
require('./db/mongoose'); // don't want to grab anythig, we just want to make sure the file runs and connects to the database
const userRouter = require('./routers/user');
const petRouter = require('./routers/pet');
const foodRouter = require('./routers/food');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // will automatically parse incoming json to an object so we can access it in our request handlers
app.use(userRouter);
app.use(petRouter);
app.use(foodRouter);

app.listen(port, () => {
  console.log('Server is up on port ' + port);
});
