require('./db/mongoose');
const ENV = require('../config/env');

const express = require('express');
const app = express();

const usersRouter = require('./routers/users_router')

const PORT = ENV.PORT || 5000;

app.use(express.json());

app.use(usersRouter);

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`)
});