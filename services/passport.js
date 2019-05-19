const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const keys = require('../config/keys')

const User = mongoose.model('users')

//to set up cookies for user
passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      done(null, user)
    })
})

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      // to find accounts where googleId matches profile id
      User.findOne({ googleId: profile.id })
        .then(existingUser => {
          if (existingUser) {
            // we already have a user with that profile id,
            // no need to create a new one on mongoose
            done(null, existingUser)
          } else {
            // we dont have a user with that profile id
            // we need to make a new user
            // to create new user
            new User({ googleId: profile.id }).save()
              .then(user => done(null, user))
          }
        })



    }
  )
)
