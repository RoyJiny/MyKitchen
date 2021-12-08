var morgan = require('morgan');

const logger = morgan((tokens,req,res) => {
  var format = 'Handling new request:';
  format += `\n  route:   ${tokens.url(req, res)}`;
  format += `\n  ip:      ${tokens['remote-addr'](req, res)}`;
  
  if (req.user)
    format += `\n  user id: ${req.user._id}`;

  format += `\n  status:  ${tokens.status(req, res)}\n`;

  return format;
});

module.exports = logger;