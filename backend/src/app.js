require('./db/mongoose');

const express = require('express');

const app = express();

const usersRouter = require('./routers/users_router')
const ordersRouter = require('./routers/orders_router');
const searchRouter = require('./routers/search_router');
const imagesRouter = require('./routers/images_router');
const verificationRouter = require('./routers/verification_router');
const chatsRouter = require('./routers/chats_router');

const {stdout_logger} = require('./utils/logger');

const PORT = process.env.PORT || 8080;

app.use(express.json());

app.use(stdout_logger);

app.use(usersRouter);
app.use(ordersRouter);
app.use(searchRouter);
app.use(imagesRouter);
app.use(verificationRouter);
app.use(chatsRouter);

app.disable('etag');

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});
