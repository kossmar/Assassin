import Local from 'passport-local'
import User from '../models/User'
import dbConnect from '../utils/dbConnect'
// import { findUser, validatePassword } from './user'

export const localStrategy = new Local.Strategy(function (username, password, done) {

    dbConnect()

    User.findOne({ username: username }, function (err, user) {
        if (err) { return done(err); }
        if (!user) {
            return done(null, false, { message: 'Incorrect E-mail.' });
        }
        user.authenticate(password, (err, model, passwordError) => {
            if (passwordError) {
                return done(null, false, { message: 'Incorrect Password.' });
            } else {
                return done(null, user);
            }
        })
    })
})

// export const localStrategy = new Local.Strategy(function (username,password,done) {
//   findUser({ username })
//     .then((user) => {
//       if (user && validatePassword(user, password)) {
//         done(null, user)
//       } else {
//         done(new Error('Invalid username and password combination'))
//       }
//     })
//     .catch((error) => {
//       done(error)
//     })
// })
