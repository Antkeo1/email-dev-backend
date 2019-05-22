const express = require('express')
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const passport = require('passport')
const keys = require('./config/prod')
require('./models/User')
require('./services/passport')

mongoose.connect(prod.mongoURI)

const app = express()

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
)
app.use(passport.initialize())
app.use(passport.session())

require('./routes/authRoutes')(app)

app.listen(process.env.PORT || 5000, function(){
    console.log('Your node js server is running');
});
// const PORT = process.env.PORT || 5000
// app.listen(PORT)
