require('./db/mongoose');
const ENV = require('../config/env');

var morgan = require('morgan');
const express = require('express');

const app = express();

const usersRouter = require('./routers/users_router')
const ordersRouter = require('./routers/orders_router');
const { format } = require('morgan');

const PORT = ENV.PORT || 5000;

app.use(express.json());

// log all requests
app.use(morgan((tokens,req,res) => {
  var format = 'Handling request:';
  format += `\n  route:   ${tokens.url(req, res)}`;
  format += `\n  ip:      ${tokens['remote-addr'](req, res)}`;
  
  if (req.user)
    format += `\n  user id: ${req.user._id}`;

  format += `\n  status:  ${tokens.status(req, res)}\n`;

  return format;
}));

app.use(usersRouter);
app.use(ordersRouter);

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`)
});