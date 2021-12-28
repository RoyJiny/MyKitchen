var morgan = require('morgan');
var fs = require('fs')

const stdout_logger = morgan((tokens,req,res) => {
  var format = 'Handling new request:';
  format += `\n  route:   ${tokens.url(req, res)}`;
  format += `\n  ip:      ${tokens['remote-addr'](req, res)}`;
  
  if (req.user)
    format += `\n  user id: ${req.user._id}`;

  format += `\n  status:  ${tokens.status(req, res)}\n`;

  return format;
});

const file_logger = (stream) => morgan((tokens,req,res) => {
  var format = 'Handling new request:';
  format += `\n  route:   ${tokens.url(req, res)}`;
  format += `\n  ip:      ${tokens['remote-addr'](req, res)}`;
  
  if (req.user)
    format += `\n  user id: ${req.user._id}`;

  format += `\n  status:  ${tokens.status(req, res)}\n`;

  return format;
},{stream});

module.exports = {stdout_logger,file_logger};