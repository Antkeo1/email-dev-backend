// if (process.env.NODE_ENV === 'production') {
  //module.exports = require('./prod')
//} else {
//  module.exports = require('./dev')
//}
let apiUrl
const apiUrls = {
  production: 'https://floating-gorge-22160.herokuapp.com	',
  development: 'http://localhost:5000'
}

if (window.location.hostname === 'localhost') {
  apiUrl = apiUrls.development
} else {
  apiUrl = apiUrls.production
}

module.exports = {
  apiUrl
}
