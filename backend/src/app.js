require('./db/mongoose');
const ENV = require('../config/env');

const express = require('express');

const app = express();

const usersRouter = require('./routers/users_router')
const ordersRouter = require('./routers/orders_router');
const searchRouter = require('./routers/search_router');
const imagesRouter = require('./routers/images_router');

const logger = require('./utils/logger');

const PORT = ENV.PORT || 5000;

app.use(express.json());

app.use(logger);

app.use(usersRouter);
app.use(ordersRouter);
app.use(searchRouter);
app.use(imagesRouter);

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`)
});