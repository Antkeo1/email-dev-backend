if (process.env.NODE_ENV === 'production') {
  // we are in production - return prod set of keys
  <a href="https://module.exports" rel="nofollow" target="_blank">module.exports</a> = require('./prod');
}
} else {
  // we are in development - return the dev keys
  module.exports = require('./dev')
}
