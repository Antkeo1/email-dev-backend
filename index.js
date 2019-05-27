const express = require('express')
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const passport = require('passport')
const bodyParser = require('body-parser')
const keys = require('./config/keys')
require('./models/user')
require('./services/passport')

mongoose.connect(keys.mongoURI)

const app = express()

app.use(bodyParser.json())
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
)
app.use(passport.initialize())
app.use(passport.session())


//routes
require('./routes/authRoutes')(app)
require('./routes/billingRoutes')(app)

app.listen(process.env.PORT || 5000, function(){
    console.log('Your node js server is running');
});
// const PORT = process.env.PORT || 5000
// app.listen(PORT)
